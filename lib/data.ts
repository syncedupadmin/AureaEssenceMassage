import { promises as fs } from 'fs';
import path from 'path';

// Types for business data
export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  durations: string[];
  idealFor: string;
  benefits: string[];
  imageSrc: string;
  imageAlt: string;
}

export interface AddOn {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
  icon: string;
}

export interface Pricing {
  services: Record<string, Record<string, number | null>>;
  addOns: Record<string, number | null>;
}

export interface BusinessData {
  services: Service[];
  addOns: AddOn[];
  pricing: Pricing;
}

const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'business.json');

/**
 * Read business data from JSON file
 */
export async function getBusinessData(): Promise<BusinessData> {
  try {
    const fileContent = await fs.readFile(DATA_FILE_PATH, 'utf-8');
    return JSON.parse(fileContent) as BusinessData;
  } catch (error) {
    console.error('Error reading business data:', error);
    throw new Error('Failed to read business data');
  }
}

/**
 * Write business data to JSON file
 */
export async function saveBusinessData(data: BusinessData): Promise<void> {
  try {
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error saving business data:', error);
    throw new Error('Failed to save business data');
  }
}

/**
 * Get all services
 */
export async function getServices(): Promise<Service[]> {
  const data = await getBusinessData();
  return data.services;
}

/**
 * Get a single service by ID
 */
export async function getServiceById(id: string): Promise<Service | null> {
  const data = await getBusinessData();
  return data.services.find(s => s.id === id) || null;
}

/**
 * Add or update a service
 */
export async function saveService(service: Service): Promise<void> {
  const data = await getBusinessData();
  const existingIndex = data.services.findIndex(s => s.id === service.id);

  if (existingIndex >= 0) {
    data.services[existingIndex] = service;
  } else {
    data.services.push(service);
    // Initialize pricing for new service
    data.pricing.services[service.id] = {};
    service.durations.forEach(duration => {
      data.pricing.services[service.id][duration] = null;
    });
  }

  await saveBusinessData(data);
}

/**
 * Delete a service by ID
 */
export async function deleteService(id: string): Promise<void> {
  const data = await getBusinessData();
  data.services = data.services.filter(s => s.id !== id);
  delete data.pricing.services[id];
  await saveBusinessData(data);
}

/**
 * Get all add-ons
 */
export async function getAddOns(): Promise<AddOn[]> {
  const data = await getBusinessData();
  return data.addOns;
}

/**
 * Get enabled add-ons only
 */
export async function getEnabledAddOns(): Promise<AddOn[]> {
  const data = await getBusinessData();
  return data.addOns.filter(a => a.enabled);
}

/**
 * Save an add-on
 */
export async function saveAddOn(addOn: AddOn): Promise<void> {
  const data = await getBusinessData();
  const existingIndex = data.addOns.findIndex(a => a.id === addOn.id);

  if (existingIndex >= 0) {
    data.addOns[existingIndex] = addOn;
  } else {
    data.addOns.push(addOn);
    data.pricing.addOns[addOn.id] = null;
  }

  await saveBusinessData(data);
}

/**
 * Delete an add-on
 */
export async function deleteAddOn(id: string): Promise<void> {
  const data = await getBusinessData();
  data.addOns = data.addOns.filter(a => a.id !== id);
  delete data.pricing.addOns[id];
  await saveBusinessData(data);
}

/**
 * Get pricing data
 */
export async function getPricing(): Promise<Pricing> {
  const data = await getBusinessData();
  return data.pricing;
}

/**
 * Update service pricing
 */
export async function updateServicePricing(
  serviceId: string,
  duration: string,
  price: number | null
): Promise<void> {
  const data = await getBusinessData();
  if (!data.pricing.services[serviceId]) {
    data.pricing.services[serviceId] = {};
  }
  data.pricing.services[serviceId][duration] = price;
  await saveBusinessData(data);
}

/**
 * Update add-on pricing
 */
export async function updateAddOnPricing(
  addOnId: string,
  price: number | null
): Promise<void> {
  const data = await getBusinessData();
  data.pricing.addOns[addOnId] = price;
  await saveBusinessData(data);
}

/**
 * Update all pricing at once
 */
export async function updateAllPricing(pricing: Pricing): Promise<void> {
  const data = await getBusinessData();
  data.pricing = pricing;
  await saveBusinessData(data);
}

/**
 * Helper: Get price display string for a service duration
 */
export function getServicePriceDisplay(
  pricing: Pricing,
  serviceId: string,
  duration: string
): string | null {
  const servicePricing = pricing.services[serviceId];
  if (!servicePricing) return null;

  const price = servicePricing[duration];
  if (price === null || price === undefined) return null;

  return `$${price}`;
}

/**
 * Helper: Get add-on price display string
 */
export function getAddOnPriceDisplay(
  pricing: Pricing,
  addOnId: string
): string | null {
  const price = pricing.addOns[addOnId];
  if (price === null || price === undefined) return null;

  return `+$${price}`;
}

/**
 * Helper: Check if any prices are set for a service
 */
export function hasAnyServicePricing(pricing: Pricing, serviceId: string): boolean {
  const servicePricing = pricing.services[serviceId];
  if (!servicePricing) return false;

  return Object.values(servicePricing).some(price => price !== null);
}
