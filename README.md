# Intro
This is an simple standalone no dependancy js library to handle drag and drop

# Usage:


sample html

```
<ul id="items">
  <li class="item" draggable="true"><span>A</span></li>
  <li class="item" draggable="true"><span>B</span></li>
  <li class="item" draggable="true"><span>C</span></li>
  <li class="item" draggable="true"><span>D</span></li>
  <li class="item" draggable="true"><span>E</span></li>
</ul>

```

basic usage

``` 

let sbDraggable = new sbDraggable("#items .item", {}); 

```



Usage with callbacks

``` 
let sbDraggable = new sbDraggable("#items .item", {
    afterHandleDragStart: function(element, elementInstance, sbDraggable) { return; },
    afterHandleDragOver: function(element, elementInstance, sbDraggable) { return; },
    afterHandleDragEnter: function(element, elementInstance, sbDraggable) { return; },
    afterHandleDragLeave: function(element, elementInstance, sbDraggable) { return; },
    afterHandleDrop: function(element, elementInstance, sbDraggable) { return; },
    afterHandleDragEnd: function(element, elementInstance, sbDraggable) { return; }
}); 
```

# Reference 
[https://codepen.io/retrofuturistic/pen/tlbHE](https://codepen.io/retrofuturistic/pen/tlbHE)
