
  function displayBoxes(){

    let elements=document.getElementsByClassName('deletionIndicator');
    for(element of elements){
      element.style.visibility="visible";
    };

    let removebutton=document.getElementsByClassName('removeButton');
    for(element of removebutton){
      element.style.visibility="visible";
    };

    return 0;
  }
