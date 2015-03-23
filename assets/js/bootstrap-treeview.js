/* =========================================================
 * bootstrap-treeview.js v1.0.2
 * =========================================================
 * Copyright 2013 Jonathan Miles 
 * Project URL : http://www.jondmiles.com/bootstrap-treeview
 *	
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */

;(function ($, window, document, undefined) {

	/*global jQuery, console*/

	'use strict';

	var pluginName = 'treeview';

	var defaults = {


		injectStyle: true,

		levels: 2,

		expandIcon: 'glyphicon glyphicon-plus',
		collapseIcon: 'glyphicon glyphicon-minus',
		emptyIcon: 'glyphicon',
		nodeIcon: 'glyphicon glyphicon-stop',

		color: undefined, // '#000000',
		backColor: undefined, // '#FFFFFF',
		borderColor: undefined, // '#dddddd',
		onhoverColor: undefined, //'#F5F5F5'
		selectedColor: '#428bca', //'#FFFFFF'
		selectedBackColor: undefined, //'#428bca'

		//INI - Modificación para seleccionar Nodo + Padre (Sólo Funciona con 2 niveles)
		enableTwoLevelsSelection: false,
		//FIN - Modificación para seleccionar Nodo + Padre (Sólo Funciona con 2 niveles)		
		enableLinks: false,
		highlightSelected: true,
		showBorder: true,
		showTags: false,

		// Event handlers
		onNodeCollapsed: undefined,
		onNodeExpanded: undefined,
		onNodeSelected: undefined,
		onNodeUnselected: undefined
	};

	var Tree = function (element, options) {

		this.$element = $(element);
		this.elementId = element.id;
		this.styleId = this.elementId + '-style';
		
		this.init(options);

		return {
			options: this.options,
			init: $.proxy(this.init, this),
			remove: $.proxy(this.remove, this),
			getNode: $.proxy(this.getNode, this),
			getParent: $.proxy(this.getParent, this),
			getSiblings: $.proxy(this.getSiblings, this)
		};
	};

	Tree.prototype.init = function (options) {
		
		this.tree = [];
		this.nodes = [];

		if (options.data) {
			if (typeof options.data === 'string') {
				options.data = $.parseJSON(options.data);
			}
			this.tree = $.extend(true, [], options.data);
			delete options.data;
		}
		this.options = $.extend({}, defaults, options);

		this.destroy();
		this.subscribeEvents();
		this.setInitialStates({ nodes: this.tree }, 0);
		this.render();
	};

	Tree.prototype.remove = function () {
		this.destroy();
		$.removeData(this, pluginName);
		$('#' + this.styleId).remove();
	};

	Tree.prototype.destroy = function () {

		if (!this.initialized) return;

		this.$wrapper.remove();
		this.$wrapper = null;

		// Switch off events
		this.unsubscribeEvents();

		// Reset this.initialized flag
		this.initialized = false;
	};

	Tree.prototype.unsubscribeEvents = function () {

		this.$element.off('click');

		if (typeof (this.options.onNodeCollapsed) === 'function') {
			this.$element.off('nodeCollapsed');
		}

		if (typeof (this.options.onNodeExpanded) === 'function') {
			this.$element.off('nodeExpanded');
		}

		if (typeof (this.options.onNodeSelected) === 'function') {
			this.$element.off('nodeSelected');
		}

		if (typeof (this.options.onNodeUnselected) === 'function') {
			this.$element.off('nodeUnselected');
		}
	};

	Tree.prototype.subscribeEvents = function () {

		this.unsubscribeEvents();

		this.$element.on('click', $.proxy(this.clickHandler, this));

		if (typeof (this.options.onNodeCollapsed) === 'function') {
			this.$element.on('nodeCollapsed', this.options.onNodeCollapsed);
		}

		if (typeof (this.options.onNodeExpanded) === 'function') {
			this.$element.on('nodeExpanded', this.options.onNodeExpanded);
		}

		if (typeof (this.options.onNodeSelected) === 'function') {
			this.$element.on('nodeSelected', this.options.onNodeSelected);
		}

		if (typeof (this.options.onNodeUnselected) === 'function') {
			this.$element.on('nodeUnselected', this.options.onNodeUnselected);
		}
	};

	/* 
		Recurse the tree structure and ensure all nodes have
		valid initial states.  User defined states will be preserved.
		For performance we also take this opportunity to 
		index nodes in a flattened structure
	*/
	Tree.prototype.setInitialStates = function (node, level) {

		if (!node.nodes) { return; }
		level += 1;

		var parent = node;
		var _this = this;
		$.each(node.nodes, function checkStates(index, node) {

			// nodeId : unique, incremental identifier
			node.nodeId = _this.nodes.length;

			// parentId : transversing up the tree
			node.parentId = parent.nodeId;

			// if not provided set selectable default value
			if (!node.hasOwnProperty('selectable')) {
				node.selectable = true;	
			}

			// where provided we shouuld preserve states
			node.states = node.states || {};

			// set expanded state; if not provided based on levels
			if (!node.states.hasOwnProperty('expanded')) {
				if (level < _this.options.levels) {
					node.states.expanded = true;
				}
				else {
					node.states.expanded = false;
				}
			}

			// set selected state; unless set always false
			if (!node.states.hasOwnProperty('selected')) {
				node.states.selected = false;
			}

			// index nodes in a flattened structure for use later
			_this.nodes.push(node);

			// recurse child nodes and transverse the tree
			if (node.nodes) {
				_this.setInitialStates(node, level);
			}
		});
	};

	/** 
		Returns a single node object that matches the given node id.
		@param {Number} nodeId - A node's unique identifier
		@return {Object} node - Matching node
	*/
	Tree.prototype.getNode = function (nodeId) {
		return this.nodes[nodeId];
	};

	/**
		Returns the parent node of a given node, if valid otherwise returns undefined.
		@param {Object} node - A valid node object
		@returns {Object} parent - The parent node
	*/
	Tree.prototype.getParent = function (node) {
		return this.nodes[node.parentId];
	};


	/**
		Returns an array of sibling nodes for a given node, if valid otherwise returns undefined.
		@param {Object} node - A valid node object
		@returns {Array} siblings - Sibling nodes
	*/
	Tree.prototype.getSiblings = function (node) {
		var parent = this.getParent(node);
		var nodes = parent ? parent.nodes : this.tree;
		//INI - I8 - BUG FILTER FUNCTION
		if (!Array.prototype.filter)
		{
		  Array.prototype.filter = function(fun /*, thisp */)
		  {
		    "use strict";

		    if (this === void 0 || this === null)
		      throw new TypeError();

		    var t = Object(this);
		    var len = t.length >>> 0;
		    if (typeof fun !== "function")
		      throw new TypeError();

		    var res = [];
		    var thisp = arguments[1];
		    for (var i = 0; i < len; i++)
		    {
		      if (i in t)
		      {
		        var val = t[i]; // in case fun mutates this
		        if (fun.call(thisp, val, i, t))
		          res.push(val);
		      }
		    }

		    return res;
		  };
		}
		//FIN - I8 - BUG FILTER FUNCTION		
		return nodes.filter(function (obj) {
				return obj.nodeId !== node.nodeId;
			});
	};
	
	Tree.prototype.unselectSibilings = function (node){
		var nodes = this.getSiblings (node);
		for (var i=0; nodes.lenght; i++ ){
			nodes[i].states.selected = false;
		}
	};

	Tree.prototype.clickHandler = function (event) {

		if (!this.options.enableLinks) { event.preventDefault(); }
		
		var target = $(event.target),
			classList = target.attr('class') ? target.attr('class').split(' ') : [],
			node = this.findNode(target);
		//PATH TO SOLVE IE8 COMPATIBILITY
		if (!Array.prototype.indexOf)
		{
		  Array.prototype.indexOf = function(elt /*, from*/)
		  {
		    var len = this.length >>> 0;
		    var from = Number(arguments[1]) || 0;
		    from = (from < 0)
		         ? Math.ceil(from)
		         : Math.floor(from);
		    if (from < 0)
		      from += len;
		    for (; from < len; from++)
		    {
		      if (from in this &&
		          this[from] === elt)
		        return from;
		    }
		    return -1;
		  };
		}
		//END OF IE8 COMP

		if ((classList.indexOf('click-expand') != -1) ||
				(classList.indexOf('click-collapse') != -1)) {
			this.toggleExpanded(node);
		}
		else if (node) {
			if (node.selectable) {
				this.toggleSelected(node);
				this.unselectSibilings(node);				

			} else {
				this.toggleExpanded(node);
			}
		}
	};

	// Looks up the DOM for the closest parent list item to retrieve the 
	// data attribute nodeid, which is used to lookup the node in the flattened structure.
	Tree.prototype.findNode = function (target) {

		var nodeId = target.closest('li.list-group-item').attr('data-nodeid'),
			node = this.nodes[nodeId];

		if (!node) {
			console.log('Error: node does not exist');
		}
		return node;
	};

	Tree.prototype.toggleExpanded = function (node) {

		if (!node) { return; }

		if (node.states.expanded) {
			node.states.expanded = false;
			this.$element.trigger('nodeCollapsed', $.extend(true, {}, node));
		}
		else {
			node.states.expanded = true;
			this.$element.trigger('nodeExpanded', $.extend(true, {}, node));
		}

		this.render();
	};

	Tree.prototype.toggleSelected = function (node) {

		if (!node) { return; }

		//INI - Modificación para seleccionar Nodo + Padre (Sólo Funciona con 2 niveles)
		//Resetea todos los nodos menos el clickado a deselect y despues selecciona el clickado + el padre
		if (this.options.enableTwoLevelsSelection){
			var parentNode = this.getParent(node);
			var sibilingsNodes = this.getSiblings(parentNode)

			$.each(parentNode.nodes, function deleteSelected(index, Targetnode) {
				if (Targetnode!=node){
					Targetnode.states.selected = false;
				}
			});

			for (var i=0; i<sibilingsNodes.length; i++){
				sibilingsNodes[i].states.selected = false;
				if (!(typeof sibilingsNodes[i].nodes === 'undefined')){
					$.each(sibilingsNodes[i].nodes, function deleteSelected(index, Targetnode2) {
					Targetnode2.states.selected = false;
					});
				}
			}
		}

		//FIN - Modificación para seleccionar Nodo + Padre (Sólo Funciona con 2 niveles)

		if (node.states.selected) {
			node.states.selected = false;
			//INI - Modificación para seleccionar Nodo + Padre (Sólo Funciona con 2 niveles)
			if (this.options.enableTwoLevelsSelection){
				parentNode.states.selected = false;
				this.$element.trigger('nodeUnselected', $.extend(true, {}, parentNode) );			
			}
			//FIN - Modificación para seleccionar Nodo + Padre (Sólo Funciona con 2 niveles)
			this.$element.trigger('nodeUnselected', $.extend(true, {}, node) );
		}
		else {
			node.states.selected = true;
			//INI - Modificación para seleccionar Nodo + Padre (Sólo Funciona con 2 niveles)
			if (this.options.enableTwoLevelsSelection){
				parentNode.states.selected = true;
				this.$element.trigger('nodeSelected', $.extend(true, {}, parentNode) );	
			}
			//FIN - Modificación para seleccionar Nodo + Padre (Sólo Funciona con 2 niveles)
			this.$element.trigger('nodeSelected', $.extend(true, {}, node) );
		}
		
		this.render();
	};

	Tree.prototype.render = function () {

		if (!this.initialized) {

			// Setup first time only components
			this.$element.addClass(pluginName);
			this.$wrapper = $(this.template.list);

			this.injectStyle();
			
			this.initialized = true;
		}

		this.$element.empty().append(this.$wrapper.empty());

		// Build tree
		this.buildTree(this.tree, 0);
	};

	// Starting from the root node, and recursing down the 
	// structure we build the tree one node at a time
	Tree.prototype.buildTree = function (nodes, level) {

		if (!nodes) { return; }
		level += 1;

		var _this = this;
		$.each(nodes, function addNodes(id, node) {

			var treeItem = $(_this.template.item)
				.addClass('node-' + _this.elementId)
				.addClass(node.states.selected ? 'node-selected' : '')
				.attr('data-nodeid', node.nodeId)
				.attr('style', _this.buildStyleOverride(node));

			// Add indent/spacer to mimic tree structure
			for (var i = 0; i < (level - 1); i++) {
				treeItem.append(_this.template.indent);
			}

			// Add expand, collapse or empty spacer icons 
			if (node.nodes) {
				if (!node.states.expanded) {
						treeItem
							.append($(_this.template.expandCollapseIcon)
								.addClass('click-expand')
								.addClass(_this.options.expandIcon)							
							);
					}
					else {
						treeItem
							.append($(_this.template.expandCollapseIcon)
								.addClass('click-collapse')
								.addClass(_this.options.collapseIcon)
							);
					}
			}
			else {
				treeItem
					.append($(_this.template.expandCollapseIcon)
						//INI - BUG COMPATIBILIDAD IE8
						//.addClass(_this.options.emptyIcon)
						.addClass(_this.options.expandIcon)
						.css({ 'filter': 'alpha(opacity=0)' })
						.css({ 'opacity': '0' })
						//FIN - BUG COMPATIBILIDAD IE8							
					);
			}

					if (!(typeof node.iconurl === 'undefined')){
						console.log(node.iconurl);
						treeItem
							.append($(_this.template.icon)
								.addClass(node.icon ? node.icon : _this.options.nodeIcon)
								.attr ('src',node.iconurl)
							);
						//
					}else {
						// Add node icon
						treeItem
							.append($(_this.template.emptyIcon)
								.addClass(node.icon ? node.icon : _this.options.nodeIcon)
							);
					}

			// Add node icon
			//treeItem
			//	.append($(_this.template.icon)
			//		.addClass(node.icon ? node.icon : _this.options.nodeIcon)
					
			//	);

			// Add text
			if (_this.options.enableLinks) {
				// Add hyperlink
				treeItem
					.append($(_this.template.link)
						.attr('href', node.href)
						.append(node.text)
					);
			}
			else {
				// otherwise just text
				treeItem
					.append(node.text);
			}

			// Add tags as badges
			if (_this.options.showTags && node.tags) {
				$.each(node.tags, function addTag(id, tag) {
					treeItem
						.append($(_this.template.badge)
							.append(tag)
						);
				});
			}

			// Add item to the tree
			_this.$wrapper.append(treeItem);

			// Recursively add child ndoes
			// console.log(node.text + ' ' + node.states.expanded);
			if (node.nodes && node.states.expanded) {
				return _this.buildTree(node.nodes, level);
			}
		});
	};

	// Define any node level style override for
	// 1. selectedNode
	// 2. node|data assigned color overrides
	Tree.prototype.buildStyleOverride = function (node) {

		var style = '';
		if (this.options.highlightSelected && (node.states.selected)) {
			style += 'color:' + this.options.selectedColor + 
				';background-color:' + this.options.selectedBackColor + ';';
			//PARCHE PARA AÑADIRLE Subrayado y Negrita
			style += 'font-weight:bold;text-decoration:underline;';
			//FIN PARCHE	
		}
		else if (node.color) {
			style += 'color:' + node.color + 
				';background-color:' + node.backColor + ';';
		}

		return style;
	};

	// Add inline style into head 
	Tree.prototype.injectStyle = function () {

		if (this.options.injectStyle && !document.getElementById(this.styleId)) {
			$('<style type="text/css" id="' + this.styleId + '"> ' + this.buildStyle() + ' </style>').appendTo('head');
		}
	};

	// Construct trees style based on user options
	Tree.prototype.buildStyle = function () {

		var style = '.node-' + this.elementId + '{';
		if (this.options.color) {
			style += 'color:' + this.options.color + ';';
		}
		if (this.options.backColor) {
			style += 'background-color:' + this.options.backColor + ';';
		}
		if (!this.options.showBorder) {
			style += 'border:none;';
		}
		else if (this.options.borderColor) {
			style += 'border:1px solid ' + this.options.borderColor + ';';
		}
		style += '}';

		if (this.options.onhoverColor) {
			style += '.node-' + this.elementId + ':hover{' +
			'background-color:' + this.options.onhoverColor + ';' +
			'}';
		}

		return this.css + style;
	};

	Tree.prototype.template = {
		list: '<ul class="list-group"></ul>',
		item: '<li class="list-group-item"></li>',
		indent: '<span class="indent"></span>',
		expandCollapseIcon: '<span class="expand-collapse"></span>',
		icon: '<img class="icon" style="margin-left:10px;margin-right:5px;margin-bottom:5px"></img>',
		emptyIcon: '<span class="icon"></span>',
		link: '<a href="#" style="color:inherit;"></a>',
		badge: '<span class="badge"></span>'
	};

	Tree.prototype.css = '.treeview .list-group-item{cursor:pointer}.treeview span.indent{margin-left:5px;margin-right:5px}.treeview span.expand-collapse{width:1rem;height:1rem}.treeview span.icon{margin-left:10px;margin-right:5px}'
		

	var logError = function (message) {
        if(window.console) {
            window.console.error(message);
        }
    };

	// Prevent against multiple instantiations,
	// handle updates and method calls
	$.fn[pluginName] = function (options, args) {

		var result;
		
		this.each(function () {
			var _this = $.data(this, pluginName);
			if (typeof options === 'string') {
				if (!_this) {
					logError('Not initialized, can not call method : ' + options);
				}
				else if (!$.isFunction(_this[options]) || options.charAt(0) === '_') {
					logError('No such method : ' + options);
				}
				else {
					if (!(args instanceof Array)) {
						args = [ args ];
					}
					result = _this[options].apply(_this, args);
				}
			}
			else {
				$.data(this, pluginName, new Tree(this, $.extend(true, {}, options)));
			}
		});

		return result || this;
	};

})(jQuery, window, document);