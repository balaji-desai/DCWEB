export function showError(form) {
  var _msg = [];
  for(var control in form.controls) {
    if (form.controls[control].valid == false) {
      for(var error in form.controls[control].errors) {
        if (error == 'required') {
          _msg.push({ severity: 'error', summary: error, detail: control + ' required' });
        }else if(error == 'invalidDateFormat')
        {
          _msg.push({ severity: 'error', summary: error, detail: control + ' invalid' });
        }else 
        if(error == 'numeric')
          {
            _msg.push({ severity: 'error', summary: error, detail: control + ' value should be numeric.' });
          }else
          if(error == 'minlength')
            {
              _msg.push({ severity: 'error', summary: error, detail: control + ' has some invalid no of digit.' });
            }
      }
    }
  }
  return _msg;
}

export function showLineError(form){
  var _msg = {};
  for(var control in form.controls) {
    if (form.controls[control].valid == false) {
      for(var error in form.controls[control].errors) {
        if (error == 'required') {
          var veriable = control.replace(/ /g,"");
          veriable = veriable.replace(/\./g,"");
          _msg[veriable] = control+' required.';
          return _msg;
        }else 
        if(error == 'invalidDateFormat')
          {
            var veriable = control.replace(/ /g,"");
            veriable = veriable.replace(/\./g,"");
            _msg[veriable] = control+' invalid.';
            return _msg;
          }else 
          if(error == 'numeric')
            {
              var veriable = control.replace(/ /g,"");
              veriable = veriable.replace(/\./g,"");
              _msg[veriable] = control+' value should be numeric.';
              return _msg;
            }else
            if(error == 'minlength')
              {
                var veriable = control.replace(/ /g,"");
                veriable = veriable.replace(/\./g,"");
                _msg[veriable] = control+' has some invalid no of digit.';
                return _msg;
              }else
              if(error == 'maxlength')
                {
                  var veriable = control.replace(/ /g,"");
                  veriable = veriable.replace(/\./g,"");
                  _msg[veriable] = control+' has some invalid no of digit.';
                  return _msg;
                }else
              if(error == 'pattern')
                {
                  var veriable = control.replace(/ /g,"");
                  veriable = veriable.replace(/\./g,"");
                  _msg[veriable] = 'invalid '+control;
                  return _msg;
                }else
                if(error == 'email')
                  {
                    var veriable = control.replace(/ /g,"");
                    veriable = veriable.replace(/\./g,"");
                    _msg[veriable] = 'invalid '+control;
                    return _msg;
                  }
      }
    }
  }
  return _msg;
}


export function showLineErrorObj(form,_msg){
  for(var control in form.controls) {
    if (form.controls[control].valid == false) {
      for(var error in form.controls[control].errors) {
        if (error == 'required') {
          var veriable = control.replace(/ /g,"");
          veriable = veriable.replace(/\./g,"");
          _msg[veriable] = control+' required.';
          return _msg;
        }else 
        if(error == 'invalidDateFormat')
          {
            var veriable = control.replace(/ /g,"");
            veriable = veriable.replace(/\./g,"");
            _msg[veriable] = control+' invalid.';
            return _msg;
          }else 
          if(error == 'numeric')
            {
              var veriable = control.replace(/ /g,"");
              veriable = veriable.replace(/\./g,"");
              _msg[veriable] = control+' value should be numeric.';
              return _msg;
            }else
            if(error == 'maxlength')
              {
                var veriable = control.replace(/ /g,"");
                veriable = veriable.replace(/\./g,"");
                _msg[veriable] = control+' has some invalid no of digit.';
                return _msg;
              }else
            if(error == 'minlength')
              {
                var veriable = control.replace(/ /g,"");
                veriable = veriable.replace(/\./g,"");
                _msg[veriable] = control+' has some invalid no of digit.';
                return _msg;
              }else
              if(error == 'pattern')
                {
                  var veriable = control.replace(/ /g,"");
                  veriable = veriable.replace(/\./g,"");
                  _msg[veriable] = 'invalid '+control;
                  return _msg;
                }
      }
    }
  }
  return _msg;
}