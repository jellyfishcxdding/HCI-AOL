(function () {
  'use strict';


  var hamburgerBtn = document.getElementById('hamburgerBtn');
  var navMenu = document.getElementById('navMenu');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', function () {
      var isOpen = hamburgerBtn.getAttribute('aria-expanded') === 'true';
      hamburgerBtn.setAttribute('aria-expanded', String(!isOpen));
      navMenu.classList.toggle('nav--open', !isOpen);
      
    
      document.body.classList.toggle('no-scroll', !isOpen); 
    });
  }

  var filterTabs = document.querySelectorAll('.stores-filter__tab');
  var storeCards = document.querySelectorAll('.store-card');

  if (filterTabs.length > 0 && storeCards.length > 0) {
    filterTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        filterTabs.forEach(function (t) {
          t.classList.remove('stores-filter__tab--active');
        });
        tab.classList.add('stores-filter__tab--active');

        var filter = tab.getAttribute('data-filter');
        storeCards.forEach(function (card) {
          if (filter === 'all' || card.getAttribute('data-category') === filter) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }


  var form = document.getElementById('newsletterForm');
  var formSuccess = document.getElementById('formSuccess');

  if (form) {
    function showError(groupId, errorId, inputEl, msg) {
      var group = document.getElementById(groupId);
      var errorEl = document.getElementById(errorId);
      if (group) group.classList.add('form-group--error');
      if (errorEl) errorEl.textContent = msg;
      if (inputEl) inputEl.classList.add('input--error');
    }

    function clearError(groupId, errorId, inputEl) {
      var group = document.getElementById(groupId);
      var errorEl = document.getElementById(errorId);
      if (group) group.classList.remove('form-group--error');
      if (errorEl) errorEl.textContent = '';
      if (inputEl) inputEl.classList.remove('input--error');
    }


    function validateName(value) {
      var trimmed = value.trim();
      if (trimmed.length === 0) return 'Name is required.';
      if (trimmed.length < 3) return 'Name must be at least 3 characters.';
      
      var digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
      for (var i = 0; i < trimmed.length; i++) {
        if (digits.indexOf(trimmed[i]) !== -1) {
          return 'Name cannot contain numbers.';
        }
      }
      return '';
    }


    function validateEmail(value) {
      var trimmed = value.trim();
      if (trimmed.length === 0) return 'Email is required.';
      
      var atIndex = trimmed.indexOf('@');
      if (atIndex === -1) return 'Email must contain an @ symbol.';
      if (trimmed.indexOf('@', atIndex + 1) !== -1) return 'Email must contain only one @ symbol.';
      if (atIndex === 0) return 'Please enter characters before the @ symbol.';
      
      var domainPart = trimmed.slice(atIndex + 1);
      if (domainPart.indexOf('.') === -1) return 'Email domain must contain a period (e.g. .com).';
      
      return '';
    }


    function validatePhone(value) {
      var trimmed = value.trim();
      if (trimmed.length === 0) return 'Phone number is required.';
      
      var allowedChars = ['0','1','2','3','4','5','6','7','8','9',' ','+','-'];
      for (var i = 0; i < trimmed.length; i++) {
        if (allowedChars.indexOf(trimmed[i]) === -1) return 'Phone number contains invalid characters.';
      }
      if (trimmed.length < 8) return 'Phone number is too short.';
      return '';
    }

  
    function validateInterest() {
      var checkboxes = form.querySelectorAll('input[name="interest"]:checked');
      if (checkboxes.length === 0) return 'Please select at least one area of interest.';
      return '';
    }

 
    function validateFrequency() {
      var radios = form.querySelectorAll('input[name="freq"]:checked');
      if (radios.length === 0) return 'Please select a frequency.';
      return '';
    }


    function validateTerms() {
      var terms = document.getElementById('terms');
      if (!terms.checked) return 'You must agree to the terms and privacy policy.';
      return '';
    }


    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var isValid = true;

      var nameInput = document.getElementById('fullName');
      var nameMsg = validateName(nameInput.value);
      if (nameMsg) { showError('group-name', 'error-name', nameInput, nameMsg); isValid = false; } 
      else clearError('group-name', 'error-name', nameInput);

      var emailInput = document.getElementById('email');
      var emailMsg = validateEmail(emailInput.value);
      if (emailMsg) { showError('group-email', 'error-email', emailInput, emailMsg); isValid = false; } 
      else clearError('group-email', 'error-email', emailInput);

      var phoneInput = document.getElementById('phone');
      var phoneMsg = validatePhone(phoneInput.value);
      if (phoneMsg) { showError('group-phone', 'error-phone', phoneInput, phoneMsg); isValid = false; } 
      else clearError('group-phone', 'error-phone', phoneInput);

      var interestMsg = validateInterest();
      if (interestMsg) { showError('group-interest', 'error-interest', null, interestMsg); isValid = false; } 
      else clearError('group-interest', 'error-interest', null);

      var freqMsg = validateFrequency();
      if (freqMsg) { showError('group-freq', 'error-freq', null, freqMsg); isValid = false; } 
      else clearError('group-freq', 'error-freq', null);

      var termsMsg = validateTerms();
      if (termsMsg) { showError('group-terms', 'error-terms', null, termsMsg); isValid = false; } 
      else clearError('group-terms', 'error-terms', null);

      if (isValid) {
      
        form.classList.add('hidden');
        if (formSuccess) formSuccess.classList.remove('hidden');
      }
    });
  }
})();