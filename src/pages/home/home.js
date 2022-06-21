import { useState } from 'react';
import '../../style/homepage.less';
import { useHistory } from 'react-router-dom';

const Home = () => {
  const [homeClassname, setClassname] = useState('homepage');
  const { pathname } = useHistory().location;
  const shiftName = () => {
    setClassname(homeClassname === 'homepage' ? 'wholeHomepage' : 'homepage');
  };
  return (
    <div onClick={shiftName} className={homeClassname}>
      welcome to NYs2QeMWy
    </div>
  );
};

export default Home;
