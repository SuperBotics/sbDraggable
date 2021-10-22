class sbDraggable {
    constructor(querySelector, options = {}) {
        this.dragSrcEl = null;
        this.querySelector = querySelector;
        this.options = options;

        this.draggables = document.querySelectorAll(querySelector);
        [].forEach.call(this.draggables, this.addDnDHandlers);

        return this;
    }

    handleDragStart(e) {
        // Target (this) element is the source node.
        this.dragSrcEl = this;

        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.outerHTML);

        this.classList.add('sb-dragging-start');
    }
    handleDragOver(e) {
        if (e.preventDefault) {
            e.preventDefault(); // Necessary. Allows us to drop.
        }
        this.classList.add('over');

        e.dataTransfer.dropEffect = 'move'; // See the section on the DataTransfer object.

        return false;
    }
    handleDragEnter(e) {
        // this / e.target is the current hover target.
    }
    handleDragLeave(e) {
        this.classList.remove('sb-dragging-done'); // this / e.target is previous target element.
    }
    handleDrop(e) {
        // this/e.target is current target element.

        if (e.stopPropagation) {
            e.stopPropagation(); // Stops some browsers from redirecting.
        }

        // Don't do anything if dropping the same column we're dragging.
        if (this.dragSrcEl != this) {
            this.parentNode.removeChild(this.dragSrcEl);
            var dropHTML = e.dataTransfer.getData('text/html');
            this.insertAdjacentHTML('beforebegin', dropHTML);
            var dropElement = this.previousSibling;
            addDnDHandlers(dropElement);

        }
        this.classList.remove('sb-dragging-start');
        this.classList.remove('sb-dragging-done');
        return false;
    }
    handleDragEnd(e) {
        this.classList.remove('sb-dragging-start');
        this.classList.remove('sb-dragging-done');
    }
    addDnDHandlers(elem) {
        elem.addEventListener('dragstart', this.handleDragStart, false);
        elem.addEventListener('dragenter', this.handleDragEnter, false)
        elem.addEventListener('dragover', this.handleDragOver, false);
        elem.addEventListener('dragleave', this.handleDragLeave, false);
        elem.addEventListener('drop', this.handleDrop, false);
        elem.addEventListener('dragend', this.handleDragEnd, false);
    }
}

window.sbDraggable = sbDraggable;
//let sbDraggable = new sbsbDraggable("#columns .column", {});
