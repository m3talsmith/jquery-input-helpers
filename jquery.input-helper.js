/* Credits: I think I got this general idea for the default value from JasonPalmer:
  http://www.jason-palmer.com/2008/08/jquery-plugin-form-field-default-value/
  But don't hold me to that. I wasn't very careful at tracking sources at first :|.
  --
  Extended by Michael Christenson II ( michael@theurbanrebellion.com )
  http://github.com/m3talsmith/jquery-input-helpers/
  Copyright GPL 3 (included in the repository) 
  */
  
jQuery.fn.DefaultValue = function(text)
{
  return this.each(function()
  {
    /* Check to make sure this is an input type that supports our methods. */
    
    if(this.type != "password" && this.type != "text" && this.type != "textarea")
    { return; }
    
    /* Initialize our basic variables */
    
    var current_field = this;
    
    /* If this has a value that means it was put in by the user so we don't
       want to wipe that out. */
    if( this.value == '' ){ this.value = text; }
    
    /* Password inputs have a different blur and focus because we need to
       switch the "type" of the input field so that the default value isn't
       ******* on blur. That would just be silly. :) */
       
    if( this.type == "password" )
    {
      $( this ).blur( function ()
      {
        if(this.value == text || this.value == '')
        {
          $( this ).addClass( "default-value" );
          this.type  = "text";
          this.value = text;
        }
      });
      
      $( this ).focus( function ()
      {
        this.type  = "password";
        if(this.value == text || this.value == '')
        {
          $( this ).removeClass( "default-value" );
          this.value = '';
        }
      });
    }
    else
    {
      $( this ).blur( function ()
      {
        if(this.value == text || this.value == '')
        {
          $( this ).addClass( "default-value" );
          this.value = text;
        }
      });
      
      $( this ).focus( function ()
      {
        if(this.value == text || this.value == '')
        {
          $( this ).removeClass( "default-value" );
          this.value = '';
        }
      });
    }
    
    /* Make sure we clear out the default values if the form is being
       submitted. This will be done by binding the form onsubmit method 
       so that f this field has the default task it get's nulled. */
    
    $( this ).parents( "form" ).each( function()
    {
      $( this ).submit( function()
      {
        if( !(current_field.value == text || current_field.value == '') ){ current_field.value = ''; }
      });
    });
    
  });
};

jQuery.fn.ResetValue = function()
{
  return this.each( function(){
    this.value = '';
  });
};
