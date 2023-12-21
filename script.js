function validateInput(input) {
    var regex = /^[a-zA-Z0-9]*$/;
    var value = input.value;
  
    if (!regex.test(value)) {
      input.value = value.replace(/[^a-zA-Z0-9]/g, '');
    }
  }