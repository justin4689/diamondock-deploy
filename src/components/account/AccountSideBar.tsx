import { User2, ShoppingCart, Heart, Bell, CreditCard, Settings, LogOut } from 'lucide-react';
import Link from 'next/link';

interface AccountSidebarProps {
    activeSection: string;
    setActiveSection: (section: string) => void;
    link: string;
}


export const AccountSidebar = ({ activeSection , setActiveSection , link }: AccountSidebarProps) => {
    const menuItems = [
      { 
        icon: <User2 className="w-5 h-5 mr-3" />, 
        label: 'Profil', 
        section: 'profile' ,
        link: '/account/profile'
      },
      { 
        icon: <ShoppingCart className="w-5 h-5 mr-3" />, 
        label: 'Mes Commandes', 
        section: 'orders' ,
        link: '/account/orders'
      },
      { 
        icon: <Heart className="w-5 h-5 mr-3" />, 
        label: 'Mes Favoris', 
        section: 'wishlist' ,
        link: '/account/wishlist'
      },
      { 
        icon: <Bell className="w-5 h-5 mr-3" />, 
        label: 'Notifications', 
        section: 'notifications' ,
        link: '/account/notifications'
      },
      { 
        icon: <CreditCard className="w-5 h-5 mr-3" />, 
        label: 'Moyens de Paiement', 
        section: 'payments' ,
        link: '/account/payments'
      },
      { 
        icon: <Settings className="w-5 h-5 mr-3" />, 
        label: 'Paramètres', 
        section: 'settings' ,
        link: '/account/settings'
      }
    ];
  
    return (
      <div className="w-64 bg-white border-r border-gray-200 p-4">
        <div className="flex items-center mb-8">
          <div className="w-12 h-12 bg-gray-200 rounded-full mr-4 flex items-center justify-center">
            <User2 className="w-6 h-6 text-gray-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">John Doe</h2>
            <p className="text-sm text-gray-500">johndoe@email.com</p>
          </div>
        </div>
  
        <nav>
          {menuItems.map((item) => (
            <Link key={item.section} href={item.link}>
              <button
                onClick={() => setActiveSection(item.section)}
                className={`
                  flex items-center w-full p-3 mb-2 rounded-lg transition-colors duration-200
                  ${activeSection === item.section 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'hover:bg-gray-100 text-gray-700'}
                `}
              >
                {item.icon}
                {item.label}
              </button>
            </Link>
          ))}
  
          <div className="border-t mt-4 pt-4">
            <button 
              className="flex items-center w-full p-3 text-red-500 hover:bg-red-50 rounded-lg"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Déconnexion
            </button>
          </div>
        </nav>
      </div>
    );
  };


