import axios, { AxiosError, AxiosResponse } from 'axios'



const API = axios.create({
    baseURL: 'https://ts-rn-todo.herokuapp.com/api/v1',  // production backend
    // baseURL: 'http://192.168.0.40:5001/api/v1',  // development backend
  });

export const setDefaultHeaders = token => {
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

//USER
export const login = async (email, password) => {
    try {
        const response = await API.post('login', {
            email,
            password
        })
        if (response.status === 200) {
            setDefaultHeaders(response.data.token)
            return response.data
        }else{
            return false
        }

    } catch (error) {
        console.log(error)
    }
}
export const fetchAllUsers = async () => {

    try {
        const response = await API.get('getusers')
        if (response.status === 200) {
            return response.data.rows
        }else{
            throw new Error('couldnt fetch the users, try again later');
        }
        
    } catch (error) {
        console.log(error)
    }
}
export const registerUser = async (surname, lastname, email, password) => {
    try {
        const response = await API.post('register', {
            surname,
            lastname,
            email,
            password
        })

        if (response.status === 200) {
            return response.data
        }else{
            throw new Error("could not create the user");
        }

    } catch (error) {
        console.log(error);
        
    }
}
export const changeUserPassword = async (newPassword:string) => {
    try {
        const response = await API.patch('/me', {
            newPassword
        })
        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        console.log(error);
        
    }
}

//TODOS
export const fetchAllTodos = async () => {

    try {
        const response = await API.get('todos')
        if (response.status === 200) {
            return response.data.rows
        }else{
            throw new Error('couldnt fetch the todos, try again later');
        }
        
    } catch (error) {
        console.log(error)
    }
}
export const fetchUserTodos = async () => {

    try {
        const response = await API.get('user-todos')
        if (response.status === 200) {
            return response.data.rows
        }else{
            throw new Error('couldnt fetch the todos, try again later');
        }
        
    } catch (error) {
        console.log(error)
    }
}
export const deleteTodoById = async (id:number) => {
    try {
        const response = await API.delete(`todo/${id}`)
        if (response.status === 200) {
            return response.data
        }else{
            throw new Error('could not delete the todo');
        }

    } catch (error) {
        console.log(error);        
    }
}
export const createTodo = async (text:string, userId: number) => {
    try {
        const response = await API.post('todo', {
            text,
            userId
        })
        if (response.status === 200) {
            return response.data
            
        }else{
            throw new Error('could not create the todo');
        }

    } catch (error) {
        console.log(error);        
    }
}
export const toggleTodoDoneState = async (id:number) => {
    try {
        const response = await API.patch(`todo/${id}`)
        if (response.status === 200) {
            return response.data
            throw new Error('could not toggle done state');
            
        }
    } catch (error) {
        console.log(error);
        
    }
}

//CONVERSATION
export const fetchUserConversations = async () => {
    try {
        const response = await API.get('user-conversations')
        if (response.status === 200) {
            return response.data
        }else{
            throw new Error('couldnt fetch the conversations, try again later');
        }
    } catch (error) {
        console.log(error)
    }
}
export const createConversation = async ( membersId: string, name:string) => {
    try {
        const response = await API.post('conversation', {
            membersId,
            name
        })
        if (response.status === 200) {
            return response.data
            
        }else{
            throw new Error('could not create the conversation');
        }

    } catch (error) {
        console.log(error);        
    }
}
export const createMessage = async ( chatId: number, content:string) => {
    try {
        const response = await API.post('message', {
            chatId,
            content
        })
        if (response.status === 200) {
            return response.data
            
        }else{
            throw new Error('could not create the todo');
        }

    } catch (error) {
        console.log(error);        
    }
}