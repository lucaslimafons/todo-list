import { Task } from "@/schemas/task";
import { getUser } from "./auth";

export const getTasks = async () => {
  try {
    const user = getUser()

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/task/find-all`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "x-access-token": user.token
      }
    });


    if (res.status === 200) {
      const response = await res.json();
      console.log(response);

      return response
    } else {
      throw new Error('Error getting tasks.')
    }
  } catch (err) {
    console.log(err);

    throw err
  }
}

export const create = async (data: Task) => {
  try {
    const user = getUser()

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/task/create`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "x-access-token": user.token
      },
      body: JSON.stringify(data)
    });

    if (res.status === 200) {
      const response = await res.json();
      console.log(response);

      return response
    } else {
      throw new Error(await res.text())
    }
  } catch (err) {
    console.log(err);

    throw err
  }
}

export const update = async (data: Task) => {
  try {
    const user = getUser()

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/task/update/${data.id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "x-access-token": user.token
      },
      body: JSON.stringify(data)
    });

    if (res.status === 200) {
      const response = await res.json();
      console.log(response);

      return response
    } else {
      throw new Error(await res.text())
    }
  } catch (err) {
    console.log(err);

    throw err
  }
}

export const destroy = async (id: string) => {
  try {
    const user = getUser()
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/task/delete/${id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "x-access-token": user.token
      }
    });

    if (res.status === 200) {
      const response = await res.json();
      console.log(response);

      return response
    } else {
      throw new Error(await res.text())
    }
  } catch (err) {
    console.log(err);

    throw err
  }
}