import { SignInInput, SignUpInput } from "@/schemas/auth";

export const signIn = async (data: SignInInput) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/sign-in`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });


    if (res.status === 200) {
      const response = await res.json();
      console.log(response);

      localStorage.setItem('todo:user', JSON.stringify(response))
    } else {
      throw new Error('Please review your credentials.')
    }
  } catch (err) {
    console.log(err);

    throw err
  }
}

export const signUp = async (data: SignUpInput) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/sign-up`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });

    console.log(res)
    if (res.status === 200) {
      const response = await res.json();
      console.log(response);

      localStorage.setItem('todo:user', JSON.stringify(response))
    } else {
      throw new Error('Please review your credentials and try it again.')
    }
  } catch (err) {
    console.log(err);

    throw err
  }
}

export const logout = async () => {
  localStorage.removeItem('todo:user');
}

export const isLoggedIn = () => {
  const strigifiedUser = localStorage.getItem('todo:user')

  if (strigifiedUser) {
    const user = JSON.parse(strigifiedUser)

    if (user && user.id && user.token) return true
  }

  return false
}

export const getUser = () => {
  const stringifiedUser = localStorage.getItem('todo:user')

  if (stringifiedUser) return JSON.parse(stringifiedUser)

  return null
}