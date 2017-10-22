document.addEventListener("DOMContentLoaded", function(event) { 
  var app = new Vue({
    el: '#app',
    data: {
      people: [],
      newPersonName: "",
      newPersonBio: "",
      errors: [],
      searchTermFilter: "", //whenever you make a model in the view you have to instantiate it here
      sortAttribute: "name",
      sortAscending: true

    },
    mounted: function() {
      $.get('/api/v1/people.json', function(data) {
        this.people = data;
      }.bind(this));

    },
    methods: {
        addPerson: function() {
          
          var params = {
                                    name: this.newPersonName,
                                    bio: this.newPersonBio
                                   };
          $.post('/api/v1/people.json', params, function(newPerson) {
              this.people.push(newPerson);
              this.newPersonName = "";
              this.newPersonBio = "";
              this.errors = [];
          }.bind(this)).fail(function(response) {
            this.errors = response.responseJSON.errors;
          }.bind(this));
      
      },
      toggleBio: function(inputPerson) {

        inputPerson.bioVisible = !inputPerson.bioVisible;
      },

      //$.delete doesn't exist, so we have to use this:
      deletePerson: function(inputPerson) {
        $.ajax({
          type: 'DELETE',
          url: `/api/v1/people/${inputPerson.id}.json`,
          contentType: 'application/json',
          success: function(newPeople) {
            this.people = newPeople;
          }.bind(this)
        });
      },

      isValidPerson: function(inputPerson) {
        var validName = inputPerson.name.toLowerCase().indexOf(this.searchTermFilter.toLowerCase()) !== -1;
        var validBio = inputPerson.bio.toLowerCase().indexOf(this.searchTermFilter.toLowerCase()) !== -1;
        return validName || validBio;
      },
      setSortAttribute: function(inputAttribute) {
        if (inputAttribute !== this.sortAttribute) {
          this.sortAscending = true;
        } else {
          this.sortAscending = !this.sortAscending; //this toggles the sort order back and forth
        }

        this.sortAttribute = inputAttribute;
      }

    },
    computed: {
      modifiedPeople: function() {

        //this is a destructive method, it actually changes the order once you call it, forever
        return this.people.sort(function(person1, person2) {
          //this toggles the sort order between ascending and descending
          if (this.sortAscending) {
            return person1[this.sortAttribute].localeCompare(person2[this.sortAttribute]);        
          } else {
            return person2[this.sortAttribute].localeCompare(person1[this.sortAttribute]);  
          }

        }.bind(this)); 
      }

    }
  });
});

