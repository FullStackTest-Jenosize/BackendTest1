import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);

    if (count === 0) {
      router.push("/"); // หรือส่งไปยังหน้าอื่นที่ต้องการ
    }

    return () => clearInterval(interval);
  }, [count, router]);

  return (
    <div>
      <p>Redirecting you in {count} seconds</p>
    </div>
  );
};

export default LoadingToRedirect;
