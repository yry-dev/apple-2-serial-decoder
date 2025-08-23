<template>
  <div
    id="app"
    class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100"
  >
    <!-- Header -->
    <header class="bg-white shadow-lg border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div class="flex items-center space-x-3">
            <i class="fab fa-apple text-3xl text-gray-800"></i>
            <h1 class="text-2xl font-bold text-gray-900">
              Apple II GS Serial Number Decoder
            </h1>
          </div>
          <div class="flex items-center space-x-4">
            <button
              @click="showInfo = !showInfo"
              class="p-2 rounded-lg transition-colors"
              :class="
                showInfo
                  ? 'text-green-600 hover:text-green-700 hover:bg-green-100'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              "
              :title="showInfo ? 'Hide About' : 'Show About Section'"
            >
              <i class="fas fa-info-circle text-xl"></i>
            </button>
            <a
              href="https://github.com/yry-dev/apple-2-serial-decoder/blob/main/README.md"
              target="_blank"
              rel="noopener noreferrer"
              class="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              title="View on GitHub"
            >
              <i class="fab fa-github text-xl"></i>
            </a>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Serial Number Input Panel -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h2
              class="text-xl font-semibold text-gray-900 mb-6 flex items-center"
            >
              <i class="fas fa-search mr-2 text-blue-600"></i>
              Serial Number Decoder
            </h2>

            <!-- Serial Number Input -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Enter Apple II GS Serial Number
              </label>
              <div class="flex space-x-3">
                <input
                  v-model="serialNumber"
                  type="text"
                  placeholder="e.g., E749YJAA2S6000 or CK823ABC123456"
                  class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg font-mono"
                  @keyup.enter="decodeSerial"
                  @input="validateSerial"
                />
                <button
                  @click="decodeSerial"
                  :disabled="!isValidSerial || !serialNumber.trim()"
                  class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center"
                >
                  <i class="fas fa-search mr-2"></i>
                  Decode
                </button>
              </div>
              <div
                v-if="serialNumber && !isValidSerial"
                class="mt-2 text-sm text-red-600"
              >
                Please enter a valid serial number format
              </div>
            </div>

            <!-- Decoded Results -->
            <div
              v-if="decodedInfo"
              class="bg-green-50 border border-green-200 rounded-lg p-6"
            >
              <h3
                class="text-lg font-semibold text-green-800 mb-4 flex items-center"
              >
                <i class="fas fa-check-circle mr-2"></i>
                Decoded Successfully
              </h3>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-white p-4 rounded-lg border border-green-200">
                  <div class="text-sm font-medium text-green-700 mb-1">
                    Factory
                  </div>
                  <div class="text-lg font-semibold text-gray-900">
                    {{ decodedInfo.factory }}
                  </div>
                </div>

                <div class="bg-white p-4 rounded-lg border border-green-200">
                  <div class="text-sm font-medium text-green-700 mb-1">
                    Year
                  </div>
                  <div class="text-lg font-semibold text-gray-900">
                    {{ decodedInfo.year }}
                  </div>
                </div>

                <div class="bg-white p-4 rounded-lg border border-green-200">
                  <div class="text-sm font-medium text-green-700 mb-1">
                    Week
                  </div>
                  <div class="text-lg font-semibold text-gray-900">
                    {{ decodedInfo.week }}
                  </div>
                </div>

                <div class="bg-white p-4 rounded-lg border border-green-200">
                  <div class="text-sm font-medium text-green-700 mb-1">
                    Unit Number
                  </div>
                  <div class="text-lg font-semibold text-gray-900">
                    {{ decodedInfo.unitNumber }}
                  </div>
                </div>
              </div>

              <div
                v-if="hasOwnersData"
                class="mt-4 bg-white p-4 rounded-lg border border-green-200"
              >
                <div class="text-sm font-medium text-green-700 mb-1">
                  Last Known Owner
                </div>
                <div class="text-lg font-semibold text-gray-900">
                  {{ decodedInfo.lastOwner }}
                </div>
                <div
                  v-if="decodedInfo.ownerInfo"
                  class="text-sm text-gray-600 mt-1"
                >
                  {{ decodedInfo.ownerInfo }}
                </div>
              </div>
            </div>

            <!-- Error Message -->
            <div
              v-if="errorMessage"
              class="mt-4 bg-red-50 border border-red-200 rounded-lg p-4"
            >
              <div class="flex items-center">
                <i class="fas fa-exclamation-triangle text-red-400 mr-2"></i>
                <span class="text-red-800">{{ errorMessage }}</span>
              </div>
            </div>
          </div>

          <!-- Recent Searches -->
          <div
            class="bg-white rounded-xl shadow-lg p-6 border border-gray-200 mt-6"
          >
            <h2
              class="text-xl font-semibold text-gray-900 mb-6 flex items-center"
            >
              <i class="fas fa-history mr-2 text-green-600"></i>
              Recent Searches
            </h2>

            <div
              v-if="!searchHistory.length"
              class="text-center text-gray-500 py-8"
            >
              No recent searches yet
            </div>

            <div v-else class="space-y-3">
              <div
                v-for="(search, index) in searchHistory"
                :key="index"
                class="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                @click="loadSearch(search.serialNumber)"
              >
                <div class="flex items-center space-x-3">
                  <i class="fas fa-search text-gray-400"></i>
                  <span class="font-mono text-gray-900">{{
                    search.serialNumber
                  }}</span>
                  <span class="text-sm text-gray-500">{{
                    search.timestamp
                  }}</span>
                </div>
                <button
                  @click.stop="removeFromHistory(index)"
                  class="text-gray-400 hover:text-red-600 transition-colors"
                  title="Remove from history"
                >
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </div>

            <div
              v-if="searchHistory.length > 0"
              class="mt-4 flex justify-between items-center"
            >
              <button
                @click="clearHistory"
                class="text-sm text-gray-600 hover:text-red-600 transition-colors"
              >
                Clear History
              </button>
              <span class="text-sm text-gray-500"
                >{{ searchHistory.length }} searches</span
              >
            </div>
          </div>
        </div>

        <!-- Info and Help Panel -->
        <div class="space-y-6">
          <!-- About Info Panel -->
          <div
            v-if="showInfo"
            class="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
          >
            <h2
              class="text-xl font-semibold text-gray-900 mb-6 flex items-center"
            >
              <i class="fas fa-cog mr-2 text-gray-600"></i>
              About This Tool
            </h2>

            <div class="space-y-4 text-sm text-gray-700">
              <p>
                This tool decodes Apple II GS serial numbers to reveal
                manufacturing details and ownership history.
              </p>

              <div class="bg-green-50 p-3 rounded-lg border border-green-200">
                <div class="flex items-start">
                  <i class="fas fa-user text-green-600 mt-1 mr-2"></i>
                  <div>
                    <p class="font-semibold text-green-800 mb-1">Author:</p>
                    <p class="text-green-700">
                      Created by
                      <a
                        href="https://madelyn.sh"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-green-800 hover:text-green-900 underline"
                        >maddie</a
                      >.
                    </p>
                  </div>
                </div>
              </div>

              <div class="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                <div class="flex items-start">
                  <i class="fas fa-lightbulb text-yellow-600 mt-1 mr-2"></i>
                  <div>
                    <p class="font-semibold text-yellow-800 mb-1">Tip:</p>
                    <p class="text-yellow-700">
                      Serial numbers are typically found on the bottom of the
                      computer case.
                    </p>
                  </div>
                </div>
              </div>

              <div class="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <div class="flex items-start">
                  <i class="fas fa-info-circle text-blue-600 mt-1 mr-2"></i>
                  <div>
                    <p class="font-semibold text-blue-800 mb-1">Note:</p>
                    <p class="text-blue-700">
                      This tool uses a database of known serial numbers and
                      factory codes. Some serial numbers may not be found in our
                      database. The original database source can be found in the
                      <a
                        href="https://docs.google.com/spreadsheets/d/1UB9TyFh3mDyUXQgGm3Z7gxENAGOTFwL1fwLySoBRyU/edit?gid=0#gid=0"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-blue-800 hover:text-blue-900 underline"
                        >Apple IIgs Serial Number Database</a
                      >.
                    </p>
                    <div
                      v-if="isLoadingOwners"
                      class="mt-2 text-sm text-blue-600"
                    >
                      <i class="fas fa-spinner fa-spin mr-1"></i>
                      Loading owner database...
                    </div>
                    <div
                      v-if="!hasOwnersData && !isLoadingOwners"
                      class="mt-2 text-sm text-gray-600"
                    >
                      <i class="fas fa-info-circle mr-1"></i>
                      No owner database loaded. To enable owner information, add
                      <code class="bg-gray-100 px-1 rounded"
                        >?owners=URL_TO_YOUR_OWNERS_JSON</code
                      >
                      to the URL.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Serial Number Format Info -->
          <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h2
              class="text-xl font-semibold text-gray-900 mb-6 flex items-center"
            >
              <i class="fas fa-info-circle mr-2 text-blue-600"></i>
              Serial Number Format
            </h2>

            <div class="space-y-4">
              <div class="bg-blue-50 p-4 rounded-lg">
                <h3 class="font-semibold text-blue-900 mb-2">
                  Apple II GS Serial Number Format
                </h3>
                <p class="text-sm text-blue-800 mb-2">
                  Format:
                  <code class="bg-blue-100 px-2 py-1 rounded"
                    >X-Y-WW-YYY-XXXXXX</code
                  >
                </p>
                <ul class="text-xs text-blue-700 space-y-1">
                  <li>
                    • <strong>X</strong>: Factory code (E=Singapore, CK=Cork
                    Ireland, etc.)
                  </li>
                  <li>
                    • <strong>Y</strong>: Year of production (7=1987, 8=1988,
                    9=1989, 0=1990...)
                  </li>
                  <li>• <strong>WW</strong>: Week of production (01-52)</li>
                  <li>
                    • <strong>YYY</strong>: Unit count in base-34 (0-9, A-Z
                    excluding I,O)
                  </li>
                  <li>
                    • <strong>XXXXXX</strong>: Apple II GS identifier code
                  </li>
                </ul>
                <div class="mt-3 p-2 bg-blue-100 rounded text-xs text-blue-800">
                  <strong>Example:</strong> E749YJAA2S6000<br />
                  • E = Factory (Singapore)<br />
                  • 7 = Year (1987)<br />
                  • 49 = Week 49<br />
                  • YJA = Unit 37,614 (base-34: Y=32, J=18, A=10)<br />
                  • A2S6000 = Apple II GS code
                </div>
                <div
                  class="mt-2 p-2 bg-yellow-50 rounded text-xs text-yellow-700 border border-yellow-200"
                >
                  <strong>Base-34 System:</strong> YJA uses base-34 where 0-9,
                  A-Z (excluding I,O) represent values 0-33. This allows
                  encoding large unit numbers in just 3 characters.
                </div>
              </div>
            </div>
          </div>

          <!-- Factory Codes -->
          <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h2
              class="text-xl font-semibold text-gray-900 mb-6 flex items-center"
            >
              <i class="fas fa-industry mr-2 text-purple-600"></i>
              Factory Codes
            </h2>

            <div class="space-y-3">
              <div
                v-for="factory in factoryCodes"
                :key="factory.code"
                class="flex justify-between items-center p-2 bg-gray-50 rounded"
              >
                <span class="font-mono text-sm">{{ factory.code }}</span>
                <span class="text-sm text-gray-700">{{ factory.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t border-gray-200 mt-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="text-center text-gray-600 text-xs">
          <p>&copy; 2025 maddie no rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';

// Types
interface DecodedInfo {
  factory: string;
  year: string;
  week: string;
  unitNumber: string;
  lastOwner: string;
  ownerInfo?: string;
}

interface SearchHistory {
  serialNumber: string;
  timestamp: string;
  decodedInfo: DecodedInfo;
}

interface FactoryCode {
  code: string;
  name: string;
}

// Reactive state
const serialNumber = ref('');
const decodedInfo = ref<DecodedInfo | null>(null);
const errorMessage = ref('');
const showInfo = ref(false);
const searchHistory = ref<SearchHistory[]>([]);
const ownersData = ref<
  Record<string, { lastOwner: string; ownerInfo: string }>
>({});
const isLoadingOwners = ref(false);
const hasOwnersData = ref(false);
const ownersUrl = ref<string | null>(null);

// Factory codes database for Apple II GS
const factoryCodes = reactive<FactoryCode[]>([
  { code: 'E', name: 'Singapore' },
  { code: 'SG', name: 'Singapore' },
  { code: 'NE', name: 'Singapore (Alternative)' },
  { code: 'CK', name: 'Cork, Ireland' },
  { code: 'C', name: 'Cork, Ireland (Alternative)' },
  { code: 'F', name: 'Fremont, CA' },
  { code: 'S', name: 'Sacramento, CA' },
  { code: 'A', name: 'Austin, TX' },
  { code: 'R', name: 'Reno, NV' },
]);

// Base-34 decoding function for unit count
const decodeBase34 = (str: string): number => {
  const base34Chars = '0123456789ABCDEFGHJKLMNPQRSTUVWXYZ'; // Excluding I and O
  let result = 0;

  for (let i = 0; i < str.length; i++) {
    const char = str[i].toUpperCase();
    const value = base34Chars.indexOf(char);
    if (value === -1) return 0;
    result = result * 34 + value;
  }

  return result;
};

// Computed properties
const isValidSerial = computed(() => {
  if (!serialNumber.value) return false;

  // Check Apple II GS format: X-Y-WW-YYY-XXXXXX
  // X: factory code (1-2 letters), Y: year (1 digit), WW: week (2 digits)
  if (/^[A-Z]{1,2}\d{3}/.test(serialNumber.value)) return true;

  return false;
});

// Methods
const parseQueryString = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const ownersParam = urlParams.get('owners');
  if (ownersParam) {
    ownersUrl.value = decodeURIComponent(ownersParam);
  }
};

const fetchOwners = async () => {
  // If no owners URL is provided, skip fetching
  if (!ownersUrl.value) {
    hasOwnersData.value = false;
    return;
  }

  try {
    isLoadingOwners.value = true;
    const response = await fetch(ownersUrl.value);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    ownersData.value = data;
    hasOwnersData.value = true;
  } catch (error) {
    console.error('Failed to load owners data:', error);
    // Fallback to empty object if fetch fails
    ownersData.value = {};
    hasOwnersData.value = false;
  } finally {
    isLoadingOwners.value = false;
  }
};

const decodeSerial = async () => {
  if (!isValidSerial.value || !serialNumber.value.trim()) return;

  try {
    errorMessage.value = '';

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const decoded = decodeSerialNumber(serialNumber.value);

    if (decoded) {
      decodedInfo.value = decoded;

      // Add to search history
      const historyItem: SearchHistory = {
        serialNumber: serialNumber.value,
        timestamp: new Date().toLocaleString(),
        decodedInfo: decoded,
      };

      // Remove if already exists
      const existingIndex = searchHistory.value.findIndex(
        item => item.serialNumber === serialNumber.value
      );
      if (existingIndex !== -1) {
        searchHistory.value.splice(existingIndex, 1);
      }

      // Add to beginning
      searchHistory.value.unshift(historyItem);

      // Keep only last 10 searches
      if (searchHistory.value.length > 10) {
        searchHistory.value = searchHistory.value.slice(0, 10);
      }

      // Save to localStorage
      localStorage.setItem(
        'searchHistory',
        JSON.stringify(searchHistory.value)
      );
    } else {
      errorMessage.value =
        'Serial number not found in database. Please check the number and try again.';
      decodedInfo.value = null;
    }
  } catch (error) {
    errorMessage.value =
      'An error occurred while decoding the serial number. Please try again.';
    decodedInfo.value = null;
  }
};

const decodeSerialNumber = (serial: string): DecodedInfo | null => {
  // Parse the serial number format: X-Y-WW-YYY-XXXXXX
  const match = serial.match(
    /^([A-Z]{1,2})(\d{1})(\d{2})([A-Z0-9]{3})([A-Z0-9]{6,})$/
  );

  if (!match) return null;

  const [, factoryCode, yearDigit, week, unitCode, identifier] = match;

  // Decode year (7=1987, 8=1988, 9=1989, 0=1990, 1=1991...)
  const year = 1980 + parseInt(yearDigit);

  // Decode unit count using base-34
  const unitCount = decodeBase34(unitCode);

  // Find factory name
  const factory =
    factoryCodes.find(f => f.code === factoryCode)?.name ||
    `${factoryCode} (Unknown Factory)`;

  // Owner database loaded from JSON file
  const mockOwners = ownersData.value;

  const ownerKey = factoryCode + yearDigit + week;
  const owner = mockOwners[ownerKey] || {
    lastOwner: hasOwnersData.value
      ? 'Unknown Owner'
      : 'Owner data not available',
    ownerInfo: hasOwnersData.value
      ? 'No registration information available'
      : 'This tool is running without owner database',
  };

  return {
    factory,
    year: year.toString(),
    week,
    unitNumber: `${unitCode} (${unitCount.toLocaleString()} units)`,
    lastOwner: owner.lastOwner,
    ownerInfo: owner.ownerInfo,
  };
};

const validateSerial = () => {
  errorMessage.value = '';
  decodedInfo.value = null;
};

const loadSearch = (serial: string) => {
  serialNumber.value = serial;
  decodeSerial();
};

const removeFromHistory = (index: number) => {
  searchHistory.value.splice(index, 1);
  localStorage.setItem('searchHistory', JSON.stringify(searchHistory.value));
};

const clearHistory = () => {
  searchHistory.value = [];
  localStorage.setItem('searchHistory', JSON.stringify(searchHistory.value));
};

// Lifecycle
onMounted(async () => {
  // Parse query string for owners URL
  parseQueryString();

  // Load owners data if URL is provided
  await fetchOwners();

  // Load search history from localStorage
  const saved = localStorage.getItem('searchHistory');
  if (saved) {
    try {
      searchHistory.value = JSON.parse(saved);
    } catch (error) {
      console.error('Failed to load search history:', error);
    }
  }
});
</script>

<style>
/* Custom scrollbar for the received data area */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Smooth transitions */
* {
  transition: all 0.2s ease-in-out;
}

/* Focus styles */
.focus-ring:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}
</style>
