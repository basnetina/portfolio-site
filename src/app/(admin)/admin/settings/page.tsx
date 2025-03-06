export default function SettingsPage() {
    return (
        <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Admin Settings</h2>
            <form>
                <div className="mb-4">
                    <label htmlFor="siteName" className="block text-sm font-medium text-gray-700">
                        Site Name
                    </label>
                    <input
                        type="text"
                        id="siteName"
                        name="siteName"
                        className="mt-1 p-1 border block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="siteDescription" className="block text-sm font-medium text-gray-700">
                        Site Description
                    </label>
                    <textarea
                        id="siteDescription"
                        name="siteDescription"
                        rows={3}
                        className="mt-1 p-2 border block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="adminEmail" className="block text-sm font-medium text-gray-700">
                        Admin Email
                    </label>
                    <input
                        type="email"
                        id="adminEmail"
                        name="adminEmail"
                        className="mt-1 py-1 px-2 border block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="theme" className="block text-sm font-medium text-gray-700">
                        Theme
                    </label>
                    <select
                        id="theme"
                        name="theme"
                        className="mt-1 border p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option>Light</option>
                        <option>Dark</option>
                        <option>System</option>
                    </select>
                </div>
                <div>
                    <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Save Settings
                    </button>
                </div>
            </form>
        </div>
    )
}

