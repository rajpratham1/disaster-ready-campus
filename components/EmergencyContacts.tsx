
import React from 'react';
import { PhoneIcon } from './icons/icons';

interface Contact {
    name: string;
    number: string;
    description: string;
}

const nationalContacts: Contact[] = [
    { name: 'National Emergency Number', number: '112', description: 'For all emergencies.' },
    { name: 'Police', number: '100', description: 'For police assistance.' },
    { name: 'Fire', number: '101', description: 'For fire emergencies.' },
    { name: 'Ambulance', number: '102', description: 'For medical emergencies.' },
    { name: 'Disaster Management Services', number: '108', description: 'For disaster-related help.' },
    { name: 'Women Helpline', number: '1091', description: 'For women in distress.' },
    { name: 'Child Helpline', number: '1098', description: 'For children in need of assistance.' },
    { name: 'NDRF Helpline', number: '011-26107953', description: 'National Disaster Response Force.' },
];

const EmergencyContacts: React.FC = () => {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold text-gray-900">Emergency Contacts</h2>
                <p className="mt-2 text-lg text-gray-600">
                    Keep these important numbers handy. In an emergency, a quick call can make all the difference.
                </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-gray-800 border-b pb-4 mb-6">
                    National Emergency Numbers (India)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {nationalContacts.map((contact) => (
                        <div key={contact.name} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                            <h4 className="text-xl font-bold text-blue-600">{contact.name}</h4>
                            <a href={`tel:${contact.number}`} className="flex items-center my-2 text-3xl font-bold text-gray-800 hover:text-blue-700">
                                <PhoneIcon className="w-6 h-6 mr-3"/>
                                {contact.number}
                            </a>
                            <p className="text-gray-600">{contact.description}</p>
                        </div>
                    ))}
                </div>
            </div>
            
             <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
                <h4 className="font-bold text-yellow-800">Local Contacts</h4>
                <p className="text-yellow-700 mt-1">
                    For local disaster response teams and administrative offices, please consult your institution's specific emergency action plan. This information is typically available at the main administrative office or on the campus website.
                </p>
            </div>
        </div>
    );
};

export default EmergencyContacts;
