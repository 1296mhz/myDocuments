//import userCardController from './userCard.controller';
function _userCardController() {
    this.userProfile = {
        username: "Котик",
        role: "Administrator"
     }

     this.theme = this.theme || 'default';
  
}

let userCard = () => {
   return {
      restrict: 'E',
      template: require('./userCard.component.html'),
     // controller: _userCardController
   }
};

export default userCard;
