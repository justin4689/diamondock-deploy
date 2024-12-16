import { User2 } from "lucide-react";

// Composants de contenu pour chaque section
 export const ProfileSection = () => (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Mon Profil</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center mb-6">
          <div className="w-20 h-20 bg-gray-200 rounded-full mr-6 flex items-center justify-center">
            <User2 className="w-12 h-12 text-gray-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">John Doe</h2>
            <p className="text-gray-500">johndoe@email.com</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Nom</label>
            <input 
              type="text" 
              defaultValue="John" 
              className="w-full p-2 border rounded-lg" 
              disabled
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Prénom</label>
            <input 
              type="text" 
              defaultValue="Doe" 
              className="w-full p-2 border rounded-lg" 
              disabled
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input 
              type="email" 
              defaultValue="johndoe@email.com" 
              className="w-full p-2 border rounded-lg" 
              disabled
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Téléphone</label>
            <input 
              type="tel" 
              defaultValue="+33 6 12 34 56 78" 
              className="w-full p-2 border rounded-lg" 
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  );
