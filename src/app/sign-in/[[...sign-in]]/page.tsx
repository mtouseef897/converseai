import Footer from '@/components/frontend/Footer'
import Header from '@/components/frontend/Header'
import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return <>
  
  <Header/>
  
  <div className="h-[80dvh] flex items-center justify-center bg-[url('/heroshape.png')]  bg-right bg-no-repeat">
    <SignIn />
    
    </div>

    <Footer/>
  </>
}