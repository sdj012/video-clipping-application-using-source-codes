
  function displayBoxes(){

    let elements=document.getElementsByClassName('deletionIndicator');
    
    for(element of elements){

      if(element.style.opacity==0)element.style.opacity=1
      else element.style.opacity=0;

    };

    let removebutton=document.getElementsByClassName('removeButton');
    
    for(element of removebutton){

      if(element.style.opacity==0)element.style.opacity=1
      else element.style.opacity=0;

    };

    let closebutton=document.getElementsByClassName('closeButton');

    for(element of closebutton){
      
      if(element.style.opacity==0)element.style.opacity=1
      else element.style.opacity=0;
      
    };
    console.log("displayBoxes hit")

    return 0;

  }

  function hideBoxes(){

    document.getElementById('deletionForm').reset()
    
    let elements=document.getElementsByClassName('deletionIndicator');
    for(element of elements){
      element.style.opacity=0;
    };

    let removebutton=document.getElementsByClassName('removeButton');
    for(element of removebutton){
      element.style.opacity=0;
    };

    let closebutton=document.getElementsByClassName('closeButton');
    for(element of closebutton){
      element.style.opacity=0;
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

        if(f.style.opacity==0)f.style.opacity=1
        else f.style.opacity=0;
        
      }

      let btn1=document.getElementsByClassName('addVideo');

      for(b1 of btn1){

        if(b1.style.opacity==0)b1.style.opacity=1
        else b1.style.opacity=0;
        
      }

    return 0;

  }

