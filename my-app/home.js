
  function displayBoxes(){

    let elements=document.getElementsByClassName('deletionIndicator');
    for(element of elements){
      element.style.visibility="visible";
    };

    let removebutton=document.getElementsByClassName('removeButton');
    for(element of removebutton){
      element.style.visibility="visible";
    };

    let closebutton=document.getElementsByClassName('closeButton');
    for(element of closebutton){
      element.style.visibility="visible";
    };
    console.log("displayBoxes hit")

    return 0;
  }

  function hideBoxes(){

    document.getElementById('deletionForm').reset()
    
    let elements=document.getElementsByClassName('deletionIndicator');
    for(element of elements){
      element.style.visibility="hidden";
    };

    let removebutton=document.getElementsByClassName('removeButton');
    for(element of removebutton){
      element.style.visibility="hidden";
    };

    let closebutton=document.getElementsByClassName('closeButton');
    for(element of closebutton){
      element.style.visibility="hidden";
    };

    return 0;

  }
