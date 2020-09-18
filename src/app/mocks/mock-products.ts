import { Product } from '../interfaces/product';

export const PRODUCTS: Product[] = [
  { idProduct: 1,
  title: 'Appartement lumineux face au marché bio de Convention',
  description: 'Vivez une experience parisienne hors du commun avec ce prestigieux appartement au coeur de paris.',
  property: {
  idProperty: 1,
    size: 120,
    maxGuests: 7,
    petsAuthorized: true,
    note: 'La concierge est très sympathique',
    dailyrate: 1130.0,
    address: '234 rue de la Convention',
    addressComplement: '7ème étage 2ème porte',
    zipCode: '75015',
    bedrooms: [{idBedroom: 1,
      bedroomBedTypes:
        [{idBedroomBedType: 1,
          bedType:
            {idBedType: 1,
              name: 'Simple',
              icon: 'singleBed.png'}
              },
          {idBedroomBedType: 2,
              bedType:
                {idBedType: 1,
                  name: 'Simple',
                  icon: 'singleBed.png'}
          }
          ]
    },
      {idBedroom: 2,
        bedroomBedTypes:
          [{idBedroomBedType: 3,
            bedType:
              {idBedType: 2,
                name: 'Double',
                icon: 'doubleBed.png'}
      }
      ]
      }
      ],
    bathrooms:
      [{idBathroom: 1,
        bathroomItemBathrooms:
          [{idBathroomItemBathroom: 1,
            bathroomItem:
              {idbathroomItem: 2,
                name: 'Douche',
                icon: 'shower.png'
              }
              },
            {idBathroomItemBathroom: 2,
              bathroomItem:
                {idbathroomItem: 3,
                  name: 'Baignoire',
                  icon: 'bathtub.png'}
            }
            ],
  }
  ],
    propertyType: 'APPARTMENT',
    propertyState:
      {idPropertyState: 1,
        propertyStateAmenities:
          [{idPropertyStateAmenity: 1,
            quantity: 1,
            amenity:
              {idAmenity: 1,
                name: 'Chauffage',
                icon: 'heat'}},
            {idPropertyStateAmenity: 7,
              quantity: 1,
              amenity:
                {idAmenity: 9,
                  name: 'Four à micro-ondes',
                  icon: 'microwave'}
                  }
                  ],
        propertyStateItems: []
      }
      },
    evaluations:
      [{idEvaluation: 2,
        commentary: 'J\'ai passé un super moment dans un cadre exceptionnel',
        idUser: 3,
        residence: 5,
        location: 4,
        valueForMoney: 5,
        communication: 4
  }
  ],
    productPictures:
      [{idProductPicture: 1,
        picture: 'home1/photo1.png'},
        {idProductPicture: 2,
          picture: 'home1/photo2.png'},
        {idProductPicture: 3,
          picture: 'home1/photo3.png'}
          ]
  },

          ];
