import User from "../models/user.model";


export class UserService{
    async register(params: any){
        let person;
        try{
            person = await User.create(params);
            await person.save()
        }catch (e){
            console.log(e)
        }
        return person;
    }
}

