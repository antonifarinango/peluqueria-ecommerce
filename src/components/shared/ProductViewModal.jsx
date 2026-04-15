import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { MdClose, MdDone } from 'react-icons/md';
import Status from './Status';
import { getImageUrl } from '../../utils/imageUrl';

function ProductViewModal({ open, setOpen, product, isAvailable }) {
  const { id, productName, image, description, quantity, price, discount, specialPrice } = product;

  return (
    <Dialog open={open} as="div" className="relative z-[100]" onClose={() => setOpen(false)}>
      <DialogBackdrop className="fixed inset-0 bg-on-background/40 backdrop-blur-sm transition-opacity duration-500" />
      
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 md:p-8">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-sm bg-surface shadow-2xl transition-all md:max-w-4xl w-full flex flex-col md:flex-row"
          >
            {/* Close Button */}
            <button 
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 z-20 p-2 text-on-surface hover:text-primary transition-colors bg-surface/50 backdrop-blur-md rounded-full"
            >
              <MdClose size={24} />
            </button>

            {/* Left: Image Container */}
            <div className="md:w-1/2 bg-surface-container-low aspect-[4/5] md:aspect-auto">
              {image ? (
                <img 
                  src={getImageUrl(image)}
                  alt={productName} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-outline-variant/10">
                  <span className="font-headline italic text-outline">The Editorial Salon</span>
                </div>
              )}
            </div>

            {/* Right: Content Area */}
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col relative">
              <div className="mb-2">
                 <span className="label-sm uppercase tracking-[0.2em] text-primary font-bold text-[10px]">COLECCIÓN DE BOTICARIO</span>
              </div>
              
              <DialogTitle as="h1" className="font-headline text-3xl md:text-5xl text-on-surface mb-6 leading-tight">
                {productName}
              </DialogTitle>

              <div className="flex items-center gap-6 mb-8 pb-8 border-b border-outline-variant/20">
                <div className="flex flex-col">
                  {specialPrice ? (
                    <div className="flex items-baseline gap-3">
                      <span className="text-2xl font-body font-semibold text-primary">
                        ${Number(specialPrice).toFixed(2)}
                      </span>
                      <span className="text-sm text-secondary line-through opacity-60">
                        ${Number(price).toFixed(2)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-2xl font-body font-semibold text-primary">
                      ${Number(price).toFixed(2)}
                    </span>
                  )}
                </div>

                {isAvailable ? (
                  <Status
                    text="Disponible"
                    icon={MdDone}
                    bg="bg-primary/10"
                    color="text-primary"
                  />
                ) : (
                  <Status
                    text="Agotado"
                    icon={MdClose}
                    bg="bg-rose-100"
                    color="text-rose-700"
                  />
                )}
              </div>

              <div className="flex-1">
                <h4 className="text-[10px] uppercase tracking-widest font-bold text-outline mb-3 Manrope">Nota del Producto</h4>
                <p className="text-secondary font-body leading-relaxed text-lg">
                  {description}
                </p>
                
                <ul className="mt-8 space-y-3 font-body text-sm text-on-surface-variant italic opacity-80">
                  <li>• Probado dermatológicamente</li>
                  <li>• Empaque sostenible</li>
                  <li>• Libre de parabenos y sulfatos</li>
                </ul>
              </div>

              <div className="mt-12 pt-8 flex gap-4">
                 <button
                   onClick={() => setOpen(false)}
                   className="flex-1 bg-on-surface text-surface py-5 rounded-sm font-bold tracking-[0.2em] text-xs uppercase hover:opacity-90 transition-all shadow-lg"
                 >
                   Volver al catálogo
                 </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default ProductViewModal;