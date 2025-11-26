import { CheckCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

export const Newsletter = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Gradient Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[50%] -left-[20%] w-[100%] h-[100%] bg-blue-50/50 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute -bottom-[50%] -right-[20%] w-[100%] h-[100%] bg-blue-50/50 rounded-full blur-3xl opacity-60"></div>
      </div>

      {/* Background Grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e3a5f05_1px,transparent_1px),linear-gradient(to_bottom,#1e3a5f05_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:linear-gradient(to_bottom,transparent,white)]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          <div className="max-w-2xl">
            <span className="text-blue-600 font-semibold mb-2 block">Commencez dès aujourd'hui</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-navy-900 mb-6">
              Rejoignez la liste d'attente
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Soyez parmi les premiers à profiter de l'expérience MobiSoins et bénéficiez d'avantages exclusifs au lancement.
            </p>
          </div>

          <div className="w-full max-w-md">
            <form className="flex flex-col sm:flex-row gap-3 mb-6">
              <Input 
                type="email"
                placeholder="votre@email.com" 
                className="bg-white border-gray-200 text-navy-900 placeholder:text-gray-400 focus:ring-blue-500 h-12 rounded-full px-6"
              />
              <Button 
                variant="secondary" 
                size="md" 
                className="whitespace-nowrap bg-blue-600 hover:bg-blue-700 text-white h-12 rounded-full px-8 shadow-lg hover:shadow-xl transition-all"
              >
                M'inscrire
              </Button>
            </form>

            <div className="flex flex-wrap gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-600 fill-blue-100" />
                <span>Accès prioritaire</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-600 fill-blue-100" />
                <span>Pas de carte requise</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
