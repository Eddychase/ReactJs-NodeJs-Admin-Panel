import User from "../models/User.js"

export const createUser = async (req,res,next) => {
    const newUser = new User(req.body)
    try{
     const savedUser = await newUser.save()
     res.status(200).json(savedUser)
    }catch (err) {
     next(err);
   }
}

export const updateUser = async (req,res,next) => {
    try{
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, 
            {$set:req.body},
            {new:true}
            )
        res.status(200).json(updatedUser);
        }catch (err) {
            next(err);
          }
}

export const deleteUser = async (req,res,next) => {
    try{
        await User.findByIdAndDelete( req.params.id );
       res.status(200).json("The user has been deleted");
       }catch (err) {
           next(err);
         }
}

export const getUser = async (req,res,next) => {
    try{
        const user = await User.findById( req.params.id );
    res.status(200).json(user);
    }catch (err) {
        next(err);
      }
}

export const getUsers = async (req, res, next) => {
    try {
      const users = await User.find({}, { password: 0 });
      const totalUsers = await User.countDocuments();
  
      console.log("Total users:", totalUsers);
      const usersCount = { total: totalUsers };
      res.status(200).json({ users: users, count: usersCount });
    } catch (error) {
      next(createError(500, "Internal server error"));
    }
  };