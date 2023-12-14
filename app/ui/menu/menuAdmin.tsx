'use client';
import * as React from "react"
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Image from "next/image";
import classNames from "classnames";
import {Fragment} from "react"; // Assure-toi d'importer Image de 'next/image'

function MenuDer() {
    const userId = typeof window !== 'undefined' ? localStorage.getItem("userId") : null;
    return (
        <div className="flex justify-between items-center">
            <Image width={65} height={65} src="/Snappies-Logo.png" alt="Logo Snappies" />

            <Menu as="div" className="flex justify-between items-center">
                <div>
                    <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                        Options
                        <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                    </Menu.Button>
                </div>

                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute z-50 mt-1 w-auto rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none right-0  translate-y-full">
                    <div className="py-1">
                            {/* Ici, ajoute tes sous-liens en utilisant Menu.Item */}
                            <Menu.Item>
                                {({ active }: {active:boolean}) => (
                                    <a href={`/users/${userId}`} className={classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm')}>
                                        Profil
                                    </a>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }: {active:boolean}) => (
                                    <a href="/itineraires/creation" className={classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm')}>
                                        Nouvel Itinéraire
                                    </a>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }: {active:boolean}) => (
                                    <a href="/clients/ajouterClient" className={classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm')}>
                                        Nouveau Client
                                    </a>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }: {active:boolean}) => (
                                    <a href="/commandes/creation" className={classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm')}>
                                        Nouvelle Commande
                                    </a>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }: {active:boolean}) => (
                                    <a href="/clients" className={classNames(active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm')}>
                                        Liste des Clients
                                    </a>
                                )}
                            </Menu.Item>
                            {/* Continue d'ajouter d'autres liens si nécessaire */}
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
}

export default MenuDer;
