import Header from "@/components/Header/Header";
import CartMenu from "@/components/Navbar/CartMenu";
import Head from "next/head";

export async function getServerSideProps(context: { params: { id: any } }) {
  const id = context.params.id;
  const response = await fetch(
    `http://127.0.0.1:1337/api/items?populate=image&filters[id][$eq]=${id}`
  );

  const data = await response.json();
  console.log(data);
  return {
    props: { data: data.data },
  };
}

const Item = (props: any) => {
  console.log(props);
  return (
    <>
      <Head>
        <title>{props.data[0].attributes.name} || Russian Foodis</title>
        <meta name="description" content="Russian Foodis Panama, Shop" />
      </Head>
      <Header />
      <ul>
        {props.data.map((el: any) => (
          <li key={el.id}>{el.attributes.name}</li>
        ))}
      </ul>
      <CartMenu />
    </>
  );
};
export default Item;
