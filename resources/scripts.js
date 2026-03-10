// Close mobile nav when a link is clicked
document.querySelectorAll('.main-nav a').forEach(function (a) {
  a.addEventListener('click', function () {
    var t = document.getElementById('nav-toggle');
    if (t) t.checked = false;
  });
});

// Simple sponsors carousel controls
(function (){
  var row = document.getElementById('sponsors-row');
  var prev = document.querySelector('.carousel-btn.prev');
  var next = document.querySelector('.carousel-btn.next');
  if (!row) return;
  prev.addEventListener('click', function(){ row.scrollBy({left: -240, behavior:'smooth'}) });
  next.addEventListener('click', function(){ row.scrollBy({left: 240, behavior:'smooth'}) });
  // Auto-scroll every 4s
  var auto = setInterval(function(){ row.scrollBy({left: 240, behavior:'smooth'}) }, 4000);
  // pause on hover
  row.addEventListener('mouseover', function(){ clearInterval(auto) });
  row.addEventListener('mouseleave', function(){ auto = setInterval(function(){ row.scrollBy({left: 240, behavior:'smooth'}) }, 4000) });
})();

// Calendar navigation
(function() {
  var currentMonthIndex = 0;
  var calendarData = [
    // March 2026 (starts on Sunday)
    {
      name: 'March 2026',
      startDay: 0,
      daysInMonth: 31,
      fixtures: { 
        5: { type: 'home', opponent: 'Athenas United', time: '7:30 PM' },
        10: { type: 'away', opponent: 'Olympus FC', time: '8:00 PM' },
        14: { type: 'cup', opponent: 'Sparta City', time: '6:00 PM' },
        21: { type: 'home', opponent: 'Titans FC', time: '7:30 PM' },
        28: { type: 'away', opponent: 'Neptune Rangers', time: '8:30 PM' }
      }
    },
    // April 2026 (starts on Wednesday)
    {
      name: 'April 2026',
      startDay: 3,
      daysInMonth: 30,
      fixtures: { 
        4: { type: 'home', opponent: 'Apollo Warriors', time: '7:30 PM' },
        11: { type: 'away', opponent: 'Zeus United', time: '8:00 PM' },
        18: { type: 'home', opponent: 'Poseidon FC', time: '7:30 PM' },
        25: { type: 'away', opponent: 'Ares Athletic', time: '8:30 PM' }
      }
    },
    // May 2026 (starts on Friday)
    {
      name: 'May 2026',
      startDay: 5,
      daysInMonth: 31,
      fixtures: { 
        2: { type: 'home', opponent: 'Hera City', time: '7:30 PM' },
        9: { type: 'away', opponent: 'Hermes FC', time: '8:00 PM' },
        16: { type: 'home', opponent: 'Dionysus United', time: '7:30 PM' },
        23: { type: 'cup', opponent: 'Artemis Rangers', time: '6:30 PM' },
        30: { type: 'away', opponent: 'Hephaestus FC', time: '8:30 PM' }
      }
    },
    // June 2026 (starts on Monday)
    {
      name: 'June 2026',
      startDay: 1,
      daysInMonth: 30,
      fixtures: { 
        6: { type: 'home', opponent: 'Demeter FC', time: '7:30 PM' },
        13: { type: 'away', opponent: 'Persephone United', time: '8:00 PM' },
        20: { type: 'home', opponent: 'Hades City', time: '7:30 PM' },
        27: { type: 'away', opponent: 'Athena Warriors', time: '8:30 PM' }
      }
    },
    // July 2026 (starts on Wednesday)
    {
      name: 'July 2026',
      startDay: 3,
      daysInMonth: 31,
      fixtures: { 
        4: { type: 'home', opponent: 'Kronos FC', time: '7:30 PM' },
        11: { type: 'away', opponent: 'Rhea United', time: '8:00 PM' },
        18: { type: 'cup', opponent: 'Gaia City', time: '6:00 PM' },
        25: { type: 'home', opponent: 'Uranus FC', time: '7:30 PM' }
      }
    },
    // August 2026 (starts on Saturday)
    {
      name: 'August 2026',
      startDay: 6,
      daysInMonth: 31,
      fixtures: { 
        1: { type: 'away', opponent: 'Oceanus Rangers', time: '8:00 PM' },
        8: { type: 'home', opponent: 'Hyperion FC', time: '7:30 PM' },
        15: { type: 'away', opponent: 'Themis United', time: '8:30 PM' },
        22: { type: 'home', opponent: 'Mnemosyne City', time: '7:30 PM' },
        29: { type: 'away', opponent: 'Prometheus FC', time: '8:00 PM' }
      }
    },
    // September 2026 (starts on Tuesday)
    {
      name: 'September 2026',
      startDay: 2,
      daysInMonth: 30,
      fixtures: { 
        5: { type: 'home', opponent: 'Atlas Warriors', time: '7:30 PM' },
        12: { type: 'away', opponent: 'Epimetheus FC', time: '8:00 PM' },
        19: { type: 'cup', opponent: 'Metis United', time: '6:30 PM' },
        26: { type: 'home', opponent: 'Leto City', time: '7:30 PM' }
      }
    },
    // October 2026 (starts on Thursday)
    {
      name: 'October 2026',
      startDay: 4,
      daysInMonth: 31,
      fixtures: { 
        3: { type: 'away', opponent: 'Selene FC', time: '8:00 PM' },
        10: { type: 'home', opponent: 'Eos Rangers', time: '7:30 PM' },
        17: { type: 'away', opponent: 'Helios United', time: '8:30 PM' },
        24: { type: 'home', opponent: 'Pan City', time: '7:30 PM' },
        31: { type: 'cup', opponent: 'Nike FC', time: '6:00 PM' }
      }
    },
    // November 2026 (starts on Sunday)
    {
      name: 'November 2026',
      startDay: 0,
      daysInMonth: 30,
      fixtures: { 
        7: { type: 'home', opponent: 'Tyche Warriors', time: '7:30 PM' },
        14: { type: 'away', opponent: 'Nemesis FC', time: '8:00 PM' },
        21: { type: 'home', opponent: 'Iris United', time: '7:30 PM' },
        28: { type: 'away', opponent: 'Hebe City', time: '8:30 PM' }
      }
    },
    // December 2026 (starts on Tuesday)
    {
      name: 'December 2026',
      startDay: 2,
      daysInMonth: 31,
      fixtures: { 
        5: { type: 'home', opponent: 'Hecate FC', time: '7:30 PM' },
        12: { type: 'away', opponent: 'Morpheus United', time: '8:00 PM' },
        19: { type: 'cup', opponent: 'Triton Rangers', time: '6:30 PM' },
        26: { type: 'home', opponent: 'Nereus City', time: '7:00 PM' }
      }
    }
  ];

  var prevBtn = document.getElementById('calendar-prev');
  var nextBtn = document.getElementById('calendar-next');
  var titleEl = document.getElementById('calendar-title');
  var tableEl = document.getElementById('calendar-table');

  if (!prevBtn || !nextBtn || !titleEl || !tableEl) return;

  function renderCalendar() {
    var month = calendarData[currentMonthIndex];
    titleEl.textContent = month.name;
    tableEl.setAttribute('aria-label', month.name + ' fixtures');

    var tbody = tableEl.querySelector('tbody');
    tbody.innerHTML = '';

    var totalCells = Math.ceil((month.startDay + month.daysInMonth) / 7) * 7;
    var day = 1;
    var prevMonthDays = currentMonthIndex > 0 ? 
      calendarData[currentMonthIndex - 1].daysInMonth : 28;
    var prevMonthStart = prevMonthDays - month.startDay + 1;

    for (var i = 0; i < totalCells; i += 7) {
      var row = document.createElement('tr');
      for (var j = 0; j < 7; j++) {
        var cell = document.createElement('td');
        cell.className = 'calendar-cell';
        var dateSpan = document.createElement('span');
        dateSpan.className = 'calendar-date';

        if (i + j < month.startDay) {
          // Previous month days
          cell.classList.add('is-muted');
          dateSpan.textContent = prevMonthStart + (i + j);
        } else if (day <= month.daysInMonth) {
          // Current month days
          dateSpan.textContent = day;
          if (month.fixtures[day]) {
            var fixture = month.fixtures[day];
            var event = document.createElement('div');
            event.className = 'event ' + fixture.type;
            event.setAttribute('aria-hidden', 'true');
            
            // Create tooltip
            var tooltip = document.createElement('div');
            tooltip.className = 'calendar-tooltip';
            var matchLabel = fixture.type === 'home' ? 'Hellas FC vs ' : 
                           fixture.type === 'away' ? fixture.opponent + ' vs Hellas FC' :
                           'Cup: Hellas FC vs ';
            if (fixture.type === 'home' || fixture.type === 'cup') {
              matchLabel += fixture.opponent;
            }
            tooltip.innerHTML = '<div class="tooltip-match">' + matchLabel + '</div>' +
                              '<div class="tooltip-time">' + fixture.time + '</div>';
            
            cell.classList.add('has-fixture');
            cell.appendChild(dateSpan);
            cell.appendChild(event);
            cell.appendChild(tooltip);
            day++;
            row.appendChild(cell);
            continue;
          }
          day++;
        } else {
          // Next month days
          cell.classList.add('is-muted');
          dateSpan.textContent = day - month.daysInMonth;
          day++;
        }

        cell.appendChild(dateSpan);
        row.appendChild(cell);
      }
      tbody.appendChild(row);
    }

    // Update button states
    prevBtn.disabled = currentMonthIndex === 0;
    nextBtn.disabled = currentMonthIndex === calendarData.length - 1;
  }

  prevBtn.addEventListener('click', function() {
    if (currentMonthIndex > 0) {
      currentMonthIndex--;
      renderCalendar();
    }
  });

  nextBtn.addEventListener('click', function() {
    if (currentMonthIndex < calendarData.length - 1) {
      currentMonthIndex++;
      renderCalendar();
    }
  });

  // Initial render
  renderCalendar();
})();

// Form validation and submission
(function() {
  var form = document.getElementById('register-form');
  if (!form) return;

  var nameInput = document.getElementById('form-name');
  var emailInput = document.getElementById('form-email');
  var phoneInput = document.getElementById('form-phone');
  var messageInput = document.getElementById('form-message');
  var submitBtn = form.querySelector('.submit-btn');
  var formMessageBox = document.getElementById('form-message-box');
  var charCount = document.getElementById('char-count');

  // Validation rules
  var validators = {
    name: function(value) {
      if (!value || value.trim().length < 2) {
        return 'Please enter your full name (at least 2 characters)';
      }
      if (value.length > 100) {
        return 'Name is too long (maximum 100 characters)';
      }
      return '';
    },
    email: function(value) {
      if (!value) {
        return 'Email address is required';
      }
      var emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
      if (!emailRegex.test(value)) {
        return 'Please enter a valid email address';
      }
      return '';
    },
    phone: function(value) {
      if (!value) return ''; // Phone is optional
      var phoneRegex = /^[\d\s\+\-\(\)]{10,20}$/;
      if (!phoneRegex.test(value)) {
        return 'Please enter a valid phone number';
      }
      return '';
    }
  };

  // Show error message
  function showError(input, message) {
    var errorId = input.name + '-error';
    var errorEl = document.getElementById(errorId);
    if (errorEl) {
      errorEl.textContent = message;
    }
    input.classList.add('error');
    input.classList.remove('success');
  }

  // Clear error message
  function clearError(input) {
    var errorId = input.name + '-error';
    var errorEl = document.getElementById(errorId);
    if (errorEl) {
      errorEl.textContent = '';
    }
    input.classList.remove('error');
    if (input.value.trim()) {
      input.classList.add('success');
    }
  }

  // Validate single field
  function validateField(input) {
    var validator = validators[input.name];
    if (!validator) return true;

    var error = validator(input.value);
    if (error) {
      showError(input, error);
      return false;
    } else {
      clearError(input);
      return true;
    }
  }

  // Real-time validation on blur
  [nameInput, emailInput, phoneInput].forEach(function(input) {
    if (!input) return;
    
    input.addEventListener('blur', function() {
      validateField(input);
    });

    input.addEventListener('input', function() {
      if (input.classList.contains('error')) {
        validateField(input);
      }
    });
  });

  // Character counter for message
  if (messageInput && charCount) {
    messageInput.addEventListener('input', function() {
      charCount.textContent = messageInput.value.length;
    });
  }

  // Form submission
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Validate all fields
    var isNameValid = validateField(nameInput);
    var isEmailValid = validateField(emailInput);
    var isPhoneValid = phoneInput.value ? validateField(phoneInput) : true;

    if (!isNameValid || !isEmailValid || !isPhoneValid) {
      showFormMessage('Please fix the errors above', 'error');
      return;
    }

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    formMessageBox.className = 'form-message';

    // Simulate API call
    setTimeout(function() {
      // Reset form
      form.reset();
      [nameInput, emailInput, phoneInput, messageInput].forEach(function(input) {
        if (input) {
          input.classList.remove('error', 'success');
        }
      });
      if (charCount) charCount.textContent = '0';

      // Show success message
      showFormMessage('Thank you for registering! We\'ll be in touch soon.', 'success');

      // Reset button state
      submitBtn.disabled = false;
      submitBtn.classList.remove('loading');

      // Clear success message after 5 seconds
      setTimeout(function() {
        formMessageBox.className = 'form-message';
      }, 5000);
    }, 1500);
  });

  function showFormMessage(message, type) {
    formMessageBox.textContent = message;
    formMessageBox.className = 'form-message ' + type;
  }
})();
