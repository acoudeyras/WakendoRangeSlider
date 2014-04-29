WAF.define('KendoRangeSlider', ['waf-core/widget', 'kendoCore'], function(widget, $) {
	
    var KendoRangeSlider = widget.create('KendoRangeSlider', {

    	startValue: widget.property({
    		type: 'number'
    	}),
    	
    	endValue: widget.property({
    		type: 'number'
    	}),    	
    	
    	min: widget.property({
    		type: 'number',
    		defaultValue: 0
    	}),
    	
    	max: widget.property({
    		type: 'number',
    		defaultValue: 100
    	}),
    	
    	smallStep: widget.property({
    		type: 'number',
    		defaultValue: 1
    	}),
    	
    	largeStep: widget.property({
    		type: 'number',
    		defaultValue: 2
    	}),
    	
    	showButtons: widget.property({
    		type: 'boolean',
    		defaultValue: true
    	}),
    	
    	orientation: widget.property({
    		type: 'enum',
    		values: ['horizontal', 'vertical'],
    		defaultValue: 'horizontal'
    	}),
    	
    	_bindListeners: function() {
    		var self = this;
    		
    		function valueChanged() {
    			self.kendoWidget.values(self.startValue(), self.endValue());
    		}
        	self.startValueChangeSubscriber = self.startValue.onChange(valueChanged);
        	self.endValueChangeSubscriber = self.endValue.onChange(valueChanged);
        	
        	self.min.onChange(self.render);
        	self.max.onChange(self.render);
        	self.smallStep.onChange(self.render);
        	self.largeStep.onChange(self.render);
        	self.showButtons.onChange(self.render);
        	self.orientation.onChange(self.render);   		
    	},
    	
        init: function() {
        	var self = this;

			self._bindListeners();
        	self.render();
        },
        
        render: function() {
        	var self = this;
       		$(self.node).empty();
       		var $el = $('<div />').appendTo(self.node);
       		$('<input />').appendTo($el);
			$('<input />').appendTo($el);
			
    		$el.kendoRangeSlider({
    			min: self.min(),
    			max: self.max(),
    			smallStep: self.smallStep(),
    			largeStep: self.largeStep(),
    			showButtons: self.showButtons(),
    			orientation: self.orientation(),
        		change: function(event) {
        			self.startValueChangeSubscriber.pause();
        			self.endValueChangeSubscriber.pause();
        			
        			self.startValue(event.value[0]);
        			self.endValue(event.value[1]);        			
        			
        			self.startValueChangeSubscriber.resume();
        			self.endValueChangeSubscriber.resume();
        		}
        	});
			self.kendoWidget = $el.data("kendoRangeSlider");
		      	
        },

        enable: function() {
        	self.kendoWidget.enable();
        },

        disable: function() {
        	self.kendoWidget.enable(false);
        }

    });

    return KendoRangeSlider;

});