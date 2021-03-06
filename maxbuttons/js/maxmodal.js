var maxModal;

jQuery(document).ready(function(jq) {
	$ = jq;

	maxModal = function maxModal() {

	}

	maxModal.prototype = {
		 currentModal: null,
		 modals: [],
		 controls: [],
		 parent: '#maxbuttons',  // modal will be written to this element.
		 multiple: false,
		 windowHeight: false,
		 windowWidth: false,
		 setWidth: false,
		 setHeight: false,
		 target: false,

	}

	maxModal.prototype.init = function()
	{
		this.windowHeight = $(window).height();
		this.windowWidth = $(window).width();

		$(document).off('click', '.maxmodal'); // should be on next update
		$(document).on('click', '.maxmodal', $.proxy(this.buildModal, this));
		$(window).on('resize', $.proxy(this.checkResize, this));

	}

	maxModal.prototype.focus = function()
	{
		this.currentModal.show();

	}

	maxModal.prototype.get = function()
	{
		return this.currentModal;
	}


	maxModal.prototype.show = function()
	{

		$('.maxmodal_overlay').remove();
		$('body').removeClass('max-modal-active');
		this.writeOverlay();
		this.currentModal.show();

		if (this.setWidth)
		{
			this.currentModal.width(this.setWidth);
		}
		if (this.setHeight)
		{
			this.currentModal.height(this.setHeight);
		}

		$m = this.currentModal;

		var headerHeight = $m.find('.modal_header').outerHeight();

		var contentHeight = $m.find('.modal_content').outerHeight();
		var contentWidth = $m.find('.modal_content').width();

		var controlsHeight = $m.find('.modal_controls').outerHeight();

		var modalHeight = headerHeight + contentHeight + controlsHeight; //this.currentModal.height();
		var modalWidth = contentWidth; //this.currentModal.width();
		var top  =  (this.windowHeight - modalHeight) / 2;
		var left = (this.windowWidth - modalWidth) / 2;

		if (top < 30)
		{
			top = 30;  // top + admin bar
		}
		if (left < 0)
		{
			left: 0;
		}

		if (modalHeight > this.windowHeight) // if height is higher than screen supports
		{
			newHeight = this.windowHeight - top - 5;
			this.currentModal.height(newHeight);

			var newContentH = newHeight - headerHeight - controlsHeight;
			$m.find('.modal_content').height(newContentH);

		}
		this.currentModal.css('left', left + 'px');
		this.currentModal.css('top', top + 'px');
		this.currentModal.css('height', modalHeight);


		$('.maxmodal_overlay').show();
		$('body').addClass('max-modal-active');

		$(document).off('keydown', $.proxy(this.keyPressHandler, this));
		$(document).on('keydown', $.proxy(this.keyPressHandler, this));

		this.currentModal.focus();
	}

	maxModal.prototype.keyPressHandler = function (e)
	{
		if (e.keyCode === 27)
			this.close();
	}

	maxModal.prototype.checkResize = function ()
	{
		this.windowHeight = $(window).height();
		this.windowWidth = $(window).width();

		if (this.currentModal === null)
			return;

		this.currentModal.removeAttr('style');
		this.currentModal.find('.modal_content').removeAttr('style');
		this.currentModal.removeAttr('style');

		// redo sizes, repaint.

		this.show();
	}

	maxModal.prototype.close = function()
	{
		this.currentModal.trigger('modal_close', [this]);
		this.currentModal.remove();
		this.currentModal = null;
		$('.maxmodal_overlay').remove();
		$('body').removeClass('max-modal-active');
		$(document).off('keydown', $.proxy(this.keyPressHandler, this));

	}

	maxModal.prototype.fadeOut = function (timeOut)
	{
		if (typeof timeOut == undefined)
			timeOut = 600;

		var self = this;
		this.currentModal.fadeOut(timeOut, function() { self.close(); } );

	}

	maxModal.prototype.setTitle = function(title)
	{
		this.currentModal.find('.modal_title').text(title);
	}

	maxModal.prototype.resetControls = function()
	{
		this.controls = [];
	}

	maxModal.prototype.setControls = function(controls)
	{
		var content = this.currentModal.find('.modal_content');
		var controldiv = $('<div class="modal_controls controls">');

		for(i =0; i < this.controls.length; i++)
			controldiv.append(this.controls[i]);

		if (typeof controls !== 'undefined')
			controldiv.append(controls);

		content.append(controldiv);

		// general close button
		$(this.currentModal).find('.modal_close').off('click');
		$(this.currentModal).find('.modal_close').on('click', $.proxy(this.close, this));
	}

	maxModal.prototype.addControl = function (type, data, handler)
	{
		var text = '';

		switch(type)
		{
			case 'yes':
				text = modaltext.yes;
			break;
			case 'ok':
				text = modaltext.ok;
			break;
			case 'no':
				text = modaltext.no;
			break;
			case 'cancel':
				text = modaltext.cancel;
			break;

			default:
				text = type; // if nothing else
				type = 'custom';
			break;
		}

		var control = $('<a class="button-primary ' + type + '">' + text + '</a>');
		control.on('click', data, handler );
		this.controls.push(control);

	}


	/* Set the modal content

	Sets the content of the modal. Do not run this function after adding controls.
	@param string HTML,text content of the modal
	*/
	maxModal.prototype.setContent = function(content)
	{
		if (this.currentModal !== null) // if closed fast.
			this.currentModal.find('.modal_content').html(content);
	}

	/* Builds modal from hidden data

	Builds modal from an formatted data object in DOM. Triggered on Click

	*/
	maxModal.prototype.buildModal = function(e)
	{
		e.preventDefault();

		var target = $(e.target);
		if (typeof target.data('modal') == 'undefined')
		   target = target.parents('.maxmodal');

		this.target = target;
		var id = target.data('modal');
		var data = $('#' + id);

		// options
		if (typeof data.data('width') !== 'undefined')
			this.setWidth = data.data('width');
		else
			this.setWidth = false;

		if (typeof data.data('height') !== 'undefined')
			this.setHeight = data.data('height');
		else
			this.setHeight = false;

		var title = $(data).find('.title').text();
		var controls = $(data).find('.controls').html();
		var content = $(data).find('.content').html();

		this.newModal(id);
		this.setTitle(title);
		this.setContent(content);
		this.setControls(controls);

		// callback on init
		if (typeof $(data).data('load') !== 'undefined')
		{

			// default call
			var funcName = data.data('load') + '(modal)';
			var callFunc = new Function ('modal', funcName);

			try
			{
				callFunc(this);
			}
			catch(err)
			{
				console.error('MB Modal Callback Error: ' + err.message);
				console.error('MB Modal tried calling: ' + funcName);
			}
		}

		this.show();
	}

	maxModal.prototype.newModal = function(id)
	{
		if (this.currentModal !== null)
			this.close();

		var modal = $('<div class="max-modal ' + id + '" > \
						   <div class="modal_header"> \
							   <div class="modal_close dashicons dashicons-no"></div><h3 class="modal_title"></h3> \
						   </div> \
						   <div class="inner modal_content"></div>\
					   </div>');
		if ($(this.parent).length > 0)
			$(this.parent).append(modal);
		else
			$('body').append(modal); // fallback in case of interrupting page builders

		$(modal).draggable({
			handle: '.modal_header'
		});

		this.modals.push(modal);
		this.currentModal = modal;
		this.controls = [];
		return this;

	}

	maxModal.prototype.writeOverlay = function()
	{

		$(this.parent).append('<div class="maxmodal_overlay"></div>');
		$('.maxmodal_overlay').on('click', $.proxy(this.close, this));

	}

}); // jquery
