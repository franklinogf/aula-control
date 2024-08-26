'use server'

import { signIn, signOut } from "../auth"
import { PrismaClient,Prisma } from "@prisma/client";

const prisma = new PrismaClient()
type UserCreate = Prisma.Args<typeof prisma.user, 'create'>['data']
type UserSelect = Prisma.Args<typeof prisma.user, 'findFirst'>['where']

export async function getAllUsers(where?: UserSelect) {
    try {
        const users  = prisma.user.findMany({where})
        return users
    } catch (error) {
        console.log(error)
    }
}
export async function createUser(data:UserCreate) {
    try {
        const user = prisma.user.create({
            data
        })
        return user
    } catch (error) {
        console.log(error)
    }
}
export async function getUser(where?: UserSelect) {
    try {
        const user  = prisma.user.findFirst({select:{username:true,roleId:true,year:true,id:true},where})
        return user
    } catch (error) {
        console.log(error)
    }
}
export async function signInUser(username:string,password:string){
    try {
        const  result = await signIn("credentials",{email:username,password,redirect:false})

        return true
    } catch (error) {
        return false
    }
    
}
export async function logOutUser(){
    try {
        const result = await signOut()
console.log({result})
        return true
    } catch (error) {
        return false
    }
    
}



