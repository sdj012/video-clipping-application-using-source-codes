
  function hideBoxes(){
    console.log('button clicked');
    let elements=document.getElementsByClassName('deletionIndicator');
    console.log(elements);
    for(element of elements){
      element.style.visibility="visible";
    };
  
    return 0;
  }

  

      // UserModel.remove(
      //   {username:req.params.username},
      //   {$pull:{videos:{"0":req.body.selectedVideos}}},
      //   function(err, doc) {
      //     if(err){
      //     console.log(err);
      //     }else{
      //     console.log("deleted")
      //     console.log(req.body.link);
      //     return res.redirect('/home/' + req.params.username);
      //     }
      // }
      // )

    // return 0;




  // <iframe width="596" height="448" src="https://www.youtube.com/embed/xgvckGs6xhU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>