function ConfirmDialog(id) {
  message = "The amount will be added to your Total Due. Confirm this step ?"
  $('<div></div>').appendTo('body')
    .html('<div><h6>' + message + '</h6></div>')
    .dialog({
      modal: true,
      title: 'Confirmation message',
      zIndex: 10000,
      autoOpen: true,
      width: '600',
      resizable: false,
      buttons: {
        Yes: function() {
          $.ajax({
            url: "/books/spl/"+id,
            type: 'GET',
            success: function(data){
              var us = data.user.username,c=data.cost,bid=data.bid,bn=data.bn,sid=data.tid;
              $('<div></div>').appendTo('body')
              .html('<div><h6>Username : '+us+'</h6><h6>Bookname : '+bn+'</h6><h6>BookID : '+bid+'</h6><h6>Book cost : '+c+'</h6><h6>Transaction ID : '+sid+'</h6><h5>Please take a screenshot of the RECEIPT for verification</h5></div>')
              .dialog({
              modal: true,
              title: 'RECEIPT',
              zIndex: 10000,
              autoOpen: true,
              width: '600',
              resizable: false,
              buttons:{
                close:  function(event, ui) {
                $(this).remove();}
               }
            })

              toastr.success('Purchase Successful. Due amount has been updated!!');
              var w = window.open(data.link,'_blank');
              if(w){w.focus()}
              else{alert("Please allow POPUP's to download the softcopy!!")}
            },
            error: function(err){
              alert(err);
            }                      
          })
         $(this).dialog("close");
        },
        No: function() {
          $(this).dialog("close");
        }
      },
      close: function(event, ui) {
        $(this).remove();
      }
    });
};
