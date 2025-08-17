const PDFTermsEcuPreview = () => {
	return (
		<div className='flex flex-col gap-3'>
			<p className='text-center text-[20px] font-bold'>
				TERMINOS Y CONDICIONES – POR FAVOR LEA ESTO
			</p>
			<ul className='list-disc flex flex-col gap-3'>
				<li>
					<span className='font-bold'>
						EL PRECIO DE ACEITES ESENCIALES, VEGETALES O EXTRACTOS PUEDE VARIAR
						SIN PREVIO AVISO.
					</span>
				</li>
				<li>
					Todos los costos de envíos corren por cuenta del cliente. Manuarte
					Ecuador no será responsable por daños o pérdidas de la mercadería
					ocasionados por el transportista. Le corresponde al Cliente revisar la
					mercadería en presencia del transportista y verificar el contenido de
					lo recibido.{' '}
					<span className='font-bold'>
						Cualquier reclamo por mala manipulación, deterioro, faltantes,
						derrames o retraso en la entrega deberá ser presentado al
						Transportista y NO A MANUARTE.
					</span>
				</li>
				<li>
					No se harán reembolsos, ni se aceptarán devoluciones. Todos los gastos
					de fletes para cambios de productos corren por cuenta del cliente,
					exceptuando los casos en que la responsabilidad de dicho cambio sea
					reconocida como nuestra.
				</li>
				<li>
					Todos los productos se envían a través de{' '}
					<span className='font-bold'>SERVIENTREGA</span>. Si el cliente desea
					que se despache por otra operadora, habrá un recargo extra a la
					cotización.
				</li>
				<li>
					Antes de comprar cualquiera de nuestros productos, asegúrese de que el
					mismo cumple con sus requerimientos y que es acorde a lo que usted
					necesita. Solicite una muestra (si es posible se la suministraremos
					para que haga pruebas) o compre la cantidad mínima y evalúe nuestro
					producto antes de hacer una compra considerable ya que no se aceptan
					devoluciones ni se reembolsan valores.
				</li>
				<li>
					Manuarte Ecuador vende insumos y proporciona las fichas técnicas o
					guías de proceso si estuviesen disponibles, sin embargo, no estamos
					obligados a dar formulaciones o enseñar a usar dichos productos.
				</li>
				<li>
					Es responsabilidad del cliente investigar y conocer cómo usarlos. Nos
					deslindamos de la responsabilidad por el mal uso dado a los productos
					o la no obtención de los resultados esperados.
				</li>
				<li>
					Para productos que se venden{' '}
					<span className='font-bold'>
						solo bajo pedido, el tiempo mínimo estimado para entregar al cliente
						será de 15 días a partir del pago,
					</span>
					pudiendo este tiempo extenderse por motivos ajenos a nosotros. El
					cliente se obliga a recibir el(los) producto(s) una vez están
					disponibles en nuestro almacén en Quito.
				</li>
				<li>
					Se da por entendido que el Cliente al realizar el pago de esta
					cotización acepta los términos aquí expuestos.
				</li>
			</ul>
			<div className='flex flex-col gap-3 my-4 italic'>
				<p>
					Favor realizar deposito o transferencia a: Cta. De Ahorros Banco
					Pichincha 2201295875 a nombre de Ricardo Teran Carrillo. C.I.
					171469833-7. E-mail: gerencia@manuartestore.com
				</p>
				<p>
					Si desea cancelar con tarjeta de crédito, haga la compra en
					www.manuartestore.com
				</p>
				<p className='font-bold'>Manuarte Ecuador S.A.S.</p>
			</div>
			<div className='my-12 text-center text-blue-500'>
				<p>Ulloa N26 – 130 y Vicente Aguirre, Quito – Ecuador</p>
				<p>Teléfono: 099 8916972 | E-mail: adminecuador@manuartestore.com</p>
				<a
					href='https://www.manuartestore.com'
					target='_blank'
					rel='noopener noreferrer'
					className='text-blue-500'
				>
					www.manuartestore.com
				</a>
			</div>
		</div>
	);
};

export default PDFTermsEcuPreview;
