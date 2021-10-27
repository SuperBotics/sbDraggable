class sbDraggable {
    constructor(querySelector, options = {}) {
        this.dragSrcEl = null;
        this.querySelector = querySelector;

        let defaultOptions = {
            afterHandleDragStart: function(element, elementInstance, sbDraggable) { return; },
            afterHandleDragOver: function(element, elementInstance,sbDraggable) { return; },
            afterHandleDragEnter: function(element, elementInstance, sbDraggable) { return; },
            afterHandleDragLeave: function(element, elementInstance, sbDraggable) { return; },
            afterHandleDrop: function(element, elementInstance, sbDraggable) { return; },
            afterHandleDragEnd: function(element, elementInstance, sbDraggable) { return; }
        };

        this.options = Object.assign({}, defaultOptions, options);


        this.draggables = [];
        var instance = this;

        this.draggables = document.querySelectorAll(querySelector);
        [].forEach.call(this.draggables, function(element) {
            element.setAttribute("draggable", "true")
            instance.addDnDHandlers(element, instance);
        });

        return this;
    }

    handleDragStart(e, instance) {
        // Target (this) element is the source node.

        this.dragSrcEl = instance;


        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', instance.outerHTML);

        instance.classList.add('sb-dragging-start');

        let callback = this.options.afterHandleDragStart;
        callback(e, instance, this);
    }
    handleDragOver(e, instance) {
        if (e.preventDefault) {
            e.preventDefault(); // Necessary. Allows us to drop.
        }
        instance.classList.add('sb-dragging-over');

        e.dataTransfer.dropEffect = 'move'; // See the section on the DataTransfer object.

        let callback = this.options.afterHandleDragOver;
        callback(e, instance, this);

        return false;
    }
    handleDragEnter(e, instance) {
        // this / e.target is the current hover target.

        let callback = this.options.afterHandleDragEnter;
        callback(e, instance, this);
    }
    handleDragLeave(e, instance) {
        instance.classList.remove('sb-dragging-over'); // this / e.target is previous target element.

        let callback = this.options.afterHandleDragLeave;
        callback(e, instance, this);
    }
    handleDrop(e, instance) {
        // this/e.target is current target element.

        if (e.stopPropagation) {
            e.stopPropagation(); // Stops some browsers from redirecting.
        }

        if (this.dragSrcEl === null) {
            return;
        }
        // Don't do anything if dropping the same column we're dragging.
        if (this.dragSrcEl != instance) {
            instance.parentNode.removeChild(this.dragSrcEl);
            //var dropHTML = e.dataTransfer.getData('text/html');
            instance.insertAdjacentElement('beforebegin', this.dragSrcEl);
            var dropElement = instance.previousSibling;
            this.addDnDHandlers(dropElement, this);

        }
        instance.classList.remove('sb-dragging-start');
        instance.classList.remove('sb-dragging-over');

        let callback = this.options.afterHandleDrop;
        callback(e, instance, this);

        return false;
    }
    handleDragEnd(e, instance) {
        instance.classList.remove('sb-dragging-start');
        instance.classList.remove('sb-dragging-over');

        let callback = this.options.afterHandleDragEnd;
        callback(e, instance, this);
    }
    addDnDHandlers(element, instance) {
        element.addEventListener('dragstart', function(event) { instance.handleDragStart(event, this) }, false);
        element.addEventListener('dragenter', function(event) { instance.handleDragEnter(event, this) }, false)
        element.addEventListener('dragover', function(event) { instance.handleDragOver(event, this) }, false);
        element.addEventListener('dragleave', function(event) { instance.handleDragLeave(event, this) }, false);
        element.addEventListener('drop', function(event) { instance.handleDrop(event, this) }, false);
        element.addEventListener('dragend', function(event) { instance.handleDragEnd(event, this) }, false);
    }
}

window.sbDraggable = sbDraggable;
//let sbDraggable = new sbDraggable("#columns .column", {});
