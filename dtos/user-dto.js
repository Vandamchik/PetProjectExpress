class UserDto {
    email;
    id;
    name;
    isActivated;
    isAdmin;

    constructor(model) {
        this.email = model.email;
        this.id = model._id;
        this.isActivated = model.isActivated;
        this.isAdmin = model.isAdmin;
        this.name = model.name;
    }
}

module.exports = UserDto;
