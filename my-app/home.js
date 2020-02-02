
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

  function s(){

   let videos=document.getElementsByClassName('video');

   for(v of videos){
     v.style.width="50%"
     v.style.height="50%"
   }

   return 0;
  }

  function m(){

    let videos=document.getElementsByClassName('video');
 
    for(v of videos){
      v.style.width="60%"
      v.style.height="60%"
    }
 
    return 0;
  }

  function l(){

    let videos=document.getElementsByClassName('video');
 
    for(v of videos){
      v.style.width="70%"
      v.style.height="70%"
    }
 
    return 0;
  }

  function reveal(){

    let field=document.getElementsByClassName('addInputBox');

      for(f of field){

        // if(f.style.visibility==="visible")f.style.visibility="hidden"
        // else f.style.visibility="visible"

        if(f.style.opacity==0)f.style.opacity=1
        else f.style.opacity=0;
        
      }

    return 0;

  }

