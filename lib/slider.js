function slider(element, currentImageElement) {
  var startX, endX, distanceX, currentLeft;
  var elementWidth = element.offsetWidth;
  var elementChildNumber = element.children.length;
  var elementChildWidth = element.firstElementChild.offsetWidth;
  var elementChildMarginLeft = Number(getComputedStyle(element.firstElementChild, false).marginLeft.split('px')[0]);
  var elementChildMarginRight = Number(getComputedStyle(element.firstElementChild, false).marginRight.split('px')[0]);
  var elementChildWholeWidth = elementChildMarginLeft + elementChildMarginRight + elementChildWidth;
  var visibleNumber = elementWidth/elementChildWholeWidth;
  var standardLeft = elementWidth - elementChildWholeWidth * elementChildNumber;
  // if(elementChildNumber <= elementWidth/elementChildWholeWidth) {
  //   return;
  // }
  element.style.width = elementChildWholeWidth * elementChildNumber + 'px';
  element.ondragstart = function() {
    return false;
  }
  element.onselectstart = function() {
    return false;
  }
  element.onmousedown = function(event) {
    startX = event.clientX;
    distanceX = event.clientX - element.offsetLeft;
    document.onmousemove = function(event) {
      currentLeft = event.clientX - distanceX;
      element.style.left = currentLeft + 'px';
    }
    document.onmouseup = function(event) {
      endX = event.clientX;
      document.onmousemove = null;
      document.onmouseup = null;
      if(currentLeft < standardLeft) {
        element.style.left = standardLeft + 'px';
      } else if(currentLeft > 0) {
        element.style.left = '0px';
      }
      Array.from(element.children).forEach(function(childElement, index) {
        var offsetCenterPoint = elementWidth/2 - elementChildWholeWidth * (index + 1/2);
        if(endX - startX !== 0 && currentLeft < offsetCenterPoint + elementChildWholeWidth/2 && currentLeft > offsetCenterPoint - elementChildWholeWidth/2) {
          if(elementWidth - elementChildWholeWidth * (index + parseInt(visibleNumber/2) + 2) < standardLeft) {
            element.style.left = standardLeft + 'px';
          } else if(elementWidth - elementChildWholeWidth * (index + parseInt(visibleNumber/2) + 1) > 0) {
            element.style.left = '0px';
          } else {
            element.style.left = elementWidth/2 - elementChildWholeWidth * (index + 1/2) + 'px';
          }
        }
      });
    }
  }
  Array.from(element.children).forEach(function(childElement, index) {
    childElement.onclick = function() {
      currentImageElement.querySelector('img').src = this.querySelector('img').src;
      if(endX - startX === 0) {
        if(elementWidth - elementChildWholeWidth * (index + parseInt(visibleNumber/2) + 2) < standardLeft) {
          element.style.left = standardLeft + 'px';
        } else if(elementWidth - elementChildWholeWidth * (index + parseInt(visibleNumber/2) + 1) > 0) {
          element.style.left = '0px';
        } else {
          element.style.left = elementWidth/2 - elementChildWholeWidth * (index + 1/2) + 'px';
        }
      }
    }
  });
}