import React from 'react';

const UserContext = React.createContext({
  homepage: '/',
  username: null,
  setUser: () => {}
})

export default UserContext