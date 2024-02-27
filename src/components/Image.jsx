const Image = ({ urlImagen, ancho, alternativo }) => {
  return (
    <>
      <img src={urlImagen} alt={alternativo} width={ancho} />
    </>
  );
};

export default Image;
