import { useEffect } from 'react'
import { useSearchParams } from 'react-router'

export default function GoogleCallback() {
    const [searchParams]=useSearchParams();
    useEffect(()=>{
        const sessionId=searchParams.get("sid");
        localStorage.setItem("sid",sessionId);
        window.close(); 
    },[])
  return (
    <div>GoogleCallback</div>
  )
}
