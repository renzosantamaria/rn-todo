import axios, { AxiosError, AxiosResponse } from 'axios'



const API = axios.create({
    // baseURL: 'https://ts-rn-todo.herokuapp.com/api/v1',  // production backend
    baseURL: 'http://192.168.0.30:5000/api/v1',  // development backend
  });

export const setDefaultHeaders = token => {
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

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

export const registerUser = async (surname, lastname, email, password) => {
    try {
        const response = await API.post('register', {
            surname,
            lastname,
            email,
            password
        })

        if (response.status === 200) {
            console.log('good request');
            
            // setDefaultHeaders(response.data.token)
            return response.data
        }else{
            // return response.data
            
            throw new Error("could not create the user");
            
        }

    } catch (error) {
        console.log(error);
        
    }
}

export const fetchAllTodos = async () => {

    try {
        const response = await API.get('todos')
        if (response.status === 200) {
            return response.data.rows
        }else{
            throw new Error('couldnt fetch the todos, try again later');
        }
        // return [{
        //         id: 1,
        //         text: "Improving this app :)",
        //         done: false,
        //         userId: "asd1",
        //         updatedAt: "Sat 11 Dec"
        //     }]
        
    } catch (error) {
        console.log(error)
    }
}

export const deleteTodoById = async (id:number) => {
    try {
        const response = await API.delete(`todo/${id}`)
        if (response.status === 200) {
            return response.data.rows
        }else{
            throw new Error('could not delete the todo');
        }

    } catch (error) {
        console.log(error);        
    }
}

export const createTodo = async (text, userId) => {
    try {
        const response = await API.post('todo', {
            text,
            userId
        })
        if (response.status === 200) {
            return response.data.rows
        }else{
            throw new Error('could not create the todo');
        }

    } catch (error) {
        console.log(error);        
    }
}

export const toggleDoneState = async (id:number) => {
    try {
        const response = await API.patch(`todo/${id}`)
        if (response.status === 200) {
            return response.data.rows
        }else{
            throw new Error('could not toggle done state');
            
        }
    } catch (error) {
        console.log(error);
        
    }
}