import { Mail, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

export const Newsletter = () => {
  return (
    <section className="py-16 bg-primary text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="heartbeat-newsletter" x="0" y="0" width="200" height="20" patternUnits="userSpaceOnUse">
              <path d="M0,10 Q25,0 50,10 T100,10 T150,10 T200,10" stroke="#ffffff" strokeWidth="2" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#heartbeat-newsletter)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <Mail className="h-12 w-12 mx-auto mb-4 text-white" />
          <h3 className="text-3xl font-heading font-bold mb-2">Restez Informé</h3>
          <p className="text-gray-200 mb-8">
            Recevez nos conseils santé et offres exclusives
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input 
              type="email"
              placeholder="email@example.com" 
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-300 focus:ring-navy-300 flex-1"
            />
            <Button 
              variant="secondary" 
              size="md" 
              className="whitespace-nowrap bg-white text-navy-800 hover:bg-gray-100 hover:shadow-xl"
            >
              S'abonner
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

