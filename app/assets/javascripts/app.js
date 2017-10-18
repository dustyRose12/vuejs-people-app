document.addEventListener("DOMContentLoaded", function(event) { 
  var app = new Vue({
    el: '#app',
    data: {
      people: [
                  {name: "Roseli",
                  bio: "Roseli is a sassy Cuban girl.",
                  bioVisible: false},

                  {name: "Cyrus",
                  bio: "Cyrus loves Ether.",
                  bioVisible: false},

                  {name: "Greg",
                  bio: "Greg is very jovial.",
                  bioVisible: false}
                  ],
      newPersonName: "",
      newPersonBio: "",
    },
    mounted: function() {

    },
    methods: {
        addPerson: function() {
        if (this.newPersonName && this.newPersonBio) { 
          var newPerson = {
                                    name: this.newPersonName,
                                    bio: this.newPersonBio,
                                    bioVisible: false
                                   };
          this.people.push(newPerson);
          this.newPersonName = "";
          this.newPersonBio = "";
        }
      },
      toggleBio: function(inputPerson) {

        if (inputPerson.bioVisible) {
            inputPerson.bioVisible = false;
          } else {
            inputPerson.bioVisible = true;
          }
      },

      deletePerson: function(inputPerson) {
          var index = this.people.indexOf(inputPerson);
          this.people.splice(index, 1);
      }

    },
    computed: {

    }
  });
});
