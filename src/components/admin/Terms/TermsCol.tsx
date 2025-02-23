import { formatToTitleCase } from '@/utils/formats';

const TermsCol = ({ city }: { city: string }) => {
	const BRANCHES: Record<
		string,
		{ address: string; phoneNumber: string; email: string }
	> = {
		barranquilla: {
			address: 'Calle 44 # 72 - 63, Local 106',
			phoneNumber: '322 887 3928',
			email: 'ventascolombia@manuartestore.com'
		},
		cartagena: {
			address: 'Calle 30 (Av. Consulado) # 62 - 23',
			phoneNumber: '312 388 3602',
			email: 'info@manuartestore.com'
		}
	};

	const branch = BRANCHES[city] ?? BRANCHES?.barranquilla;

	return (
		<div className='flex flex-col gap-3 leading-6'>
			<p className='text-center text-[20px] font-bold'>
				TERMINOS Y CONDICIONES – POR FAVOR LEA ESTO
			</p>
			<ul className='list-disc flex flex-col gap-3'>
				<li>
					Los pedidos nacionales se envían desde nuestra bodega en Barranquilla{' '}
					<span className='font-bold'>
						entre 24 y 72 horas después de confirmado el pago Total del pedido
					</span>
					.
				</li>
				<li>
					<span className='font-bold'>
						EL TIEMPO QUE TARDE EN LLEGAR EL PEDIDO AL CLIENTE ES
						RESPONSABILIDAD DE LA TRANSPORTADORA, NO DE MANUARTE
					</span>
				</li>
				<li>
					Todos los costos de envíos corren{' '}
					<span className='font-bold'>por cuenta del cliente</span> (incluso el
					envío de muestras). Nuestros precios{' '}
					<span className='font-bold'>NO INCLUYEN EL ENVIO</span>.
				</li>
				<li>
					Los envíos se hacen a través de la transportadora{' '}
					<span className='font-bold'>ENVIA</span> quienes son los{' '}
					<span className='font-bold'>responsables</span> de transportar el
					paquete desde nuestras instalaciones hasta el lugar indicado por el
					cliente.
				</li>
				<li>
					Si el cliente solicita se le despache por otra operadora, habrá un
					recargo extra al pedido.
				</li>
				<li>
					Manuarte Colombia no se hace responsable por daños o pérdidas de la
					mercadería ocasionados por el transportista. Le corresponde al cliente
					revisar la mercadería en presencia del transportista y verificar el
					contenido de lo recibido.{' '}
					<span className='font-bold'>
						Cualquier reclamo por mala manipulación, deterioro, faltantes,
						derrames, retraso en la entrega
					</span>{' '}
					u otro factor relacionado con el transporte del paquete,{' '}
					<span className='font-bold'>
						deberá ser presentado al transportista y NO A MANUARTE
					</span>
					.
				</li>
				<li>
					No se harán reembolsos, ni se aceptarán devoluciones. Todos los gastos
					que se generen para cambios de productos correrán por cuenta del
					cliente, exceptuando los casos en que la responsabilidad de dicho
					cambio sea reconocida como nuestra.
				</li>
				<li>
					Antes de comprar cualquiera de nuestros productos, asegúrese de que el
					mismo cumple con sus requerimientos y que es acorde a lo que necesita.
					Solicite una muestra (si es posible se la suministraremos para que
					haga las pruebas respectivas) o compre la cantidad mínima y evalúe
					nuestro producto antes de hacer una compra considerable, ya que{' '}
					<span className='font-bold'>
						no se aceptan devoluciones ni se reembolsan valores.
					</span>
				</li>
				<li>
					Manuarte Colombia vende insumos y proporciona fichas técnicas o guías
					de proceso si estuviesen disponibles, sin embargo, no estamos
					obligados a dar formulaciones o enseñar a usar dichos productos. Es
					responsabilidad del cliente investigar y conocer cómo usarlos. Nos
					deslindamos de la responsabilidad por el mal uso dado a los productos
					o la no obtención de los resultados esperados.
				</li>
				<li>
					Para productos que se venden{' '}
					<span className='font-bold'>
						solo bajo pedido, el tiempo mínimo estimado para entregarle al
						cliente, será de 15 días a partir del pago.
					</span>{' '}
					Este tiempo pudiera extenderse por motivos ajenos a nosotros. El
					cliente se obliga a recibir el(los) producto(s) una vez esté(n)
					disponible(s) para su entrega.
				</li>
				<li>
					Se da por entendido que el cliente al realizar el pago de este pedido
					acepta los términos y condiciones aquí expuestas.
				</li>
			</ul>
			<div className='flex flex-col gap-3 my-4 italic'>
				<p>
					Favor realizar pago o transferencia según el adjunto que se le envía
					donde constan los medios de pago y las consideraciones que debe tener
					en cuenta según el medio de pago que elija.
				</p>
				<p>
					Si desea cancelar con tarjeta de crédito, haga la compra en
					www.manuartestore.com
				</p>
				<p className='font-bold'>
					Manuarte Colombia S.A.S. - Sede {formatToTitleCase(city)}
				</p>
			</div>
			<div className='my-12 text-center text-blue-500'>
				<p>{branch?.address}</p>
				<p>
					Tel: {branch?.phoneNumber} | E-mail: {branch?.email}
				</p>
				<p>
					<span>Facebook: Manuarte Colombia</span>
				</p>
			</div>
		</div>
	);
};

export default TermsCol;
