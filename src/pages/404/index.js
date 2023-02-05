import { useEffect } from "react";
import { useRouter } from "next/router";




const Page404 = () => {
  const router = useRouter();
  useEffect(() => {
    setTimeout (() => {
      router.push('http://localhost:3000/');
    },3000);
  }, );
 

  return (    
  <div class='not-found-page'>
    <div class='not-found-page__content'>
      <p class ='not-found-page__content__404'>404   </p>
      <p class='span_vertical'>         </p>
      <p class="not-found-page__content__text">Страница не найдена</p>

    </div>
  </div>
        
  );
};

export default Page404;