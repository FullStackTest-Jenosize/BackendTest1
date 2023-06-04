import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import LoadingToRedirect from './LoadingToRedirect';

const UserRoute = ({ children, ...rest }) => {
  const router = useRouter();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (!currentUser) {
      router.push("/"); // ส่งไปยังหน้าอื่นที่ต้องการ
    }
  }, [currentUser, router]);

  return currentUser ? children : <LoadingToRedirect />;
};

export default UserRoute;
