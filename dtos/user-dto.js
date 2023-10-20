class UserDto {
    email;
    id;
    name;
    isActivated;

    constructor(model) {
        this.email = model.email;
        this.id = model._id;
        this.isActivated = model.isActivated;
        this.name = model.name;
    }
}

module.exports = UserDto;
